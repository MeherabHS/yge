import { NextResponse } from 'next/server';
import { contactConfig, siteConfig } from '@/content/site';

export const runtime = 'nodejs';

const MAX_PAYLOAD_BYTES = 16_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  topic?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

type RateEntry = { count: number; resetAt: number };

const globalRateStore = globalThis as typeof globalThis & {
  ygeContactRateStore?: Map<string, RateEntry>;
};
const rateStore = globalRateStore.ygeContactRateStore ?? new Map<string, RateEntry>();
globalRateStore.ygeContactRateStore = rateStore;

function clean(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n?/g, '\n')
    .trim()
    .slice(0, maxLength);
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const allowed = new Set([new URL(request.url).origin]);
  const requestHost = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  const requestProtocol = request.headers.get('x-forwarded-proto') ?? new URL(request.url).protocol.replace(':', '');
  if (requestHost) allowed.add(`${requestProtocol}://${requestHost}`);
  try {
    allowed.add(new URL(siteConfig.url).origin);
  } catch {
    // The request origin remains the safe default when the public URL is invalid.
  }
  if (allowed.has(origin)) return true;

  // Browsers may swap equivalent loopback hostnames during local previewing.
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const loopbackHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
    return (
      loopbackHosts.has(originUrl.hostname) &&
      loopbackHosts.has(requestUrl.hostname) &&
      originUrl.port === requestUrl.port
    );
  } catch {
    return false;
  }
}

function isRateLimited(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const clientKey = forwarded || request.headers.get('x-real-ip') || 'local';
  const now = Date.now();
  const current = rateStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateStore.set(clientKey, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  rateStore.set(clientKey, current);
  return current.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Request origin was not accepted.' }, { status: 403 });
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
  }

  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait a few minutes and try again.' },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    const rawPayload = await request.text();
    if (new TextEncoder().encode(rawPayload).byteLength > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
    }
    payload = JSON.parse(rawPayload) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Bots commonly fill hidden fields. Return a neutral response without sending.
  if (clean(payload.companyWebsite, 200)) {
    return NextResponse.json({ error: 'Unable to process this request.' }, { status: 400 });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const organization = clean(payload.organization, 160);
  const topic = clean(payload.topic, 80);
  const message = clean(payload.message, 5_000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Please enter your full name.';
  if (!email) fieldErrors.email = 'Please enter your email address.';
  else if (!emailPattern.test(email)) fieldErrors.email = 'Please enter a valid email address.';
  if (!contactConfig.inquiryTopics.includes(topic)) fieldErrors.topic = 'Please select an inquiry topic.';
  if (!message) fieldErrors.message = 'Please enter a message.';

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: 'Please check the required fields.', fieldErrors },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? 'YGE Website';
  const recipientEmail = process.env.BREVO_RECIPIENT_EMAIL ?? contactConfig.email;

  if (!apiKey || !senderEmail) {
    return NextResponse.json(
      { error: `Online sending is not configured yet. Please email ${contactConfig.email}.` },
      { status: 503 },
    );
  }

  const textContent = [
    'New YGE contact form message',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization / School: ${organization || 'Not provided'}`,
    `Inquiry topic: ${topic}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: recipientEmail, name: siteConfig.name }],
        replyTo: { email, name },
        subject: `[YGE Contact] ${topic} — ${name}`,
        textContent,
      }),
      cache: 'no-store',
    });

    if (!brevoResponse.ok) {
      return NextResponse.json(
        { error: `Your message could not be sent. Please email ${contactConfig.email}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: `Your message could not be sent. Please email ${contactConfig.email}.` },
      { status: 502 },
    );
  }
}
