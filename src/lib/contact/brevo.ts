import type { ContactMessage } from "./types";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const DELIVERY_TIMEOUT_MS = 10_000;

export type ContactDeliveryConfig = {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  recipientEmail: string;
  recipientName: string;
};

export function getContactDeliveryConfig(
  recipientName: string,
  defaultRecipientEmail: string,
) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) return null;

  return {
    apiKey,
    senderEmail,
    senderName: process.env.BREVO_SENDER_NAME ?? "YGE Website",
    recipientEmail: process.env.BREVO_RECIPIENT_EMAIL ?? defaultRecipientEmail,
    recipientName,
  } satisfies ContactDeliveryConfig;
}

export async function deliverContactMessage(
  message: ContactMessage,
  config: ContactDeliveryConfig,
) {
  const textContent = [
    "New YGE contact form message",
    "",
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Organization / School: ${message.organization || "Not provided"}`,
    `Inquiry topic: ${message.topic}`,
    "",
    "Message:",
    message.message,
  ].join("\n");

  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": config.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: config.senderName, email: config.senderEmail },
      to: [{ email: config.recipientEmail, name: config.recipientName }],
      replyTo: { email: message.email, name: message.name },
      subject: `[YGE Contact] ${message.topic}`,
      textContent,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
  });

  return response.ok;
}
