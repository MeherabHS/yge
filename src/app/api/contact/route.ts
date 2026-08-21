import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { contactConfig, siteConfig } from "@/content/site";
import {
  deliverContactMessage,
  getContactDeliveryConfig,
} from "@/lib/contact/brevo";
import {
  createDuplicateKey,
  DUPLICATE_TTL_SECONDS,
  verifyFormSecurity,
} from "@/lib/contact/form-security";
import {
  checkIpAttempt,
  releaseDeliveryLimits,
  reserveDeliveryLimits,
} from "@/lib/contact/rate-limit";
import {
  PayloadTooLargeError,
  readLimitedJson,
} from "@/lib/contact/request-body";
import { isAllowedContactOrigin } from "@/lib/contact/request-security";
import { logContactSecurityEvent } from "@/lib/contact/security-log";
import { validateContactPayload } from "@/lib/contact/validation";
import { getClientSecurityIdentity } from "@/lib/security/client-ip";
import { getSecurityStore } from "@/lib/security/security-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(
  body: object,
  status: number,
  requestId: string,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-request-id": requestId,
      ...headers,
    },
  });
}

function genericFailure(status: number, requestId: string) {
  return json({ error: "Unable to process this request." }, status, requestId);
}

function tooManyRequests(retryAfter: number, requestId: string) {
  return json(
    { error: "Too many requests. Please wait and try again." },
    429,
    requestId,
    { "retry-after": String(Math.max(1, Math.ceil(retryAfter))) },
  );
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  if (!isAllowedContactOrigin(request)) return genericFailure(403, requestId);

  const mediaType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    ?.trim()
    .toLowerCase();
  if (mediaType !== "application/json") {
    return json(
      { error: "Content-Type must be application/json." },
      415,
      requestId,
    );
  }
  const contentEncoding = request.headers.get("content-encoding");
  if (contentEncoding && contentEncoding.toLowerCase() !== "identity") {
    return json({ error: "Unsupported content encoding." }, 415, requestId);
  }

  let store;
  let identity;
  try {
    store = getSecurityStore();
    identity = getClientSecurityIdentity(request);
    const ipLimit = await checkIpAttempt(store, identity.identifier);
    if (!ipLimit.allowed) {
      logContactSecurityEvent({
        requestId,
        route: "/api/contact",
        statusCategory: "rate-limited",
        hashedIp: identity.identifier,
        rateLimit: "blocked",
      });
      return tooManyRequests(ipLimit.retryAfter, requestId);
    }
  } catch {
    logContactSecurityEvent({
      requestId,
      route: "/api/contact",
      statusCategory: "store-unavailable",
      rateLimit: "unavailable",
    });
    return json(
      { error: "Online sending is temporarily unavailable." },
      503,
      requestId,
    );
  }

  let payload: unknown;
  try {
    payload = await readLimitedJson(request);
  } catch (error) {
    return error instanceof PayloadTooLargeError
      ? json({ error: "Message is too large." }, 413, requestId)
      : genericFailure(400, requestId);
  }

  const validation = validateContactPayload(
    payload,
    contactConfig.inquiryTopics,
  );
  if (!validation.success) {
    if (validation.honeypot) {
      logContactSecurityEvent({
        requestId,
        route: "/api/contact",
        statusCategory: "rejected",
        hashedIp: identity.identifier,
        honeypot: "filled",
      });
      return genericFailure(400, requestId);
    }
    if (validation.malformed) return genericFailure(400, requestId);
    return json(
      {
        error: "Please check the required fields.",
        fieldErrors: validation.fieldErrors,
      },
      400,
      requestId,
    );
  }

  try {
    const security = await verifyFormSecurity(request, store);
    if (!security.ok) {
      logContactSecurityEvent({
        requestId,
        route: "/api/contact",
        statusCategory: "rejected",
        hashedIp: identity.identifier,
        csrf: security.reason === "csrf" ? "invalid" : undefined,
        formToken: security.reason === "csrf" ? undefined : "invalid",
        honeypot: "empty",
      });
      return genericFailure(
        security.reason === "too-fast" ? 400 : 403,
        requestId,
      );
    }

    const deliveryConfig = getContactDeliveryConfig(
      siteConfig.name,
      contactConfig.email,
    );
    if (!deliveryConfig) {
      return json(
        { error: "Online sending is temporarily unavailable." },
        503,
        requestId,
      );
    }

    const limits = await reserveDeliveryLimits(store, validation.message.email);
    if (!limits.allowed) {
      return tooManyRequests(limits.result.retryAfter, requestId);
    }

    const duplicateKey = createDuplicateKey(JSON.stringify(validation.message));
    const consumeResult = await store.consumeFormToken(
      security.value.formStoreKey,
      security.value.record,
      duplicateKey,
      DUPLICATE_TTL_SECONDS,
    );
    if (consumeResult !== "consumed") {
      await releaseDeliveryLimits(store, limits.reservation);
      logContactSecurityEvent({
        requestId,
        route: "/api/contact",
        statusCategory: "rejected",
        hashedIp: identity.identifier,
        csrf: "valid",
        formToken: consumeResult === "duplicate" ? "replayed" : "invalid",
        honeypot: "empty",
      });
      return genericFailure(
        consumeResult === "duplicate" ? 409 : 403,
        requestId,
      );
    }

    try {
      if (await deliverContactMessage(validation.message, deliveryConfig)) {
        return json({ ok: true }, 201, requestId);
      }
    } catch {
      // Provider details are intentionally not logged or returned.
    }

    await releaseDeliveryLimits(store, limits.reservation);
    return json(
      { error: "Your message could not be sent. Please try again later." },
      502,
      requestId,
    );
  } catch {
    logContactSecurityEvent({
      requestId,
      route: "/api/contact",
      statusCategory: "security-control-unavailable",
      hashedIp: identity.identifier,
      rateLimit: "unavailable",
    });
    return json(
      { error: "Online sending is temporarily unavailable." },
      503,
      requestId,
    );
  }
}
