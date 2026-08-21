import { hashSecurityValue } from "@/lib/security/crypto";
import type {
  RateLimitResult,
  SecurityStore,
} from "@/lib/security/security-store";

export const CONTACT_RATE_LIMITS = {
  ipAttempts: { limit: 5, windowSeconds: 15 * 60 },
  emailSuccesses: { limit: 3, windowSeconds: 60 * 60 },
  tokenIssues: { limit: 20, windowSeconds: 15 * 60 },
} as const;

function boundedInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 && parsed <= 100_000
    ? parsed
    : fallback;
}

export function globalLimitConfig() {
  return {
    limit: boundedInteger(process.env.CONTACT_GLOBAL_LIMIT, 100),
    windowSeconds: boundedInteger(
      process.env.CONTACT_GLOBAL_WINDOW_SECONDS,
      60 * 60,
    ),
  };
}

export function rateKey(dimension: string, identifier: string) {
  return `limit:${dimension}:${identifier}`;
}

export async function checkIpAttempt(
  store: SecurityStore,
  ipIdentifier: string,
) {
  const config = CONTACT_RATE_LIMITS.ipAttempts;
  return store.incrementLimit(
    rateKey("ip", ipIdentifier),
    config.limit,
    config.windowSeconds,
  );
}

export async function checkTokenIssue(
  store: SecurityStore,
  ipIdentifier: string,
) {
  const config = CONTACT_RATE_LIMITS.tokenIssues;
  return store.incrementLimit(
    rateKey("token-issue", ipIdentifier),
    config.limit,
    config.windowSeconds,
  );
}

export type DeliveryLimitReservation = {
  emailKey: string;
  globalKey: string;
};

export async function reserveDeliveryLimits(
  store: SecurityStore,
  normalizedEmail: string,
): Promise<
  | { allowed: true; reservation: DeliveryLimitReservation }
  | { allowed: false; result: RateLimitResult }
> {
  const emailKey = rateKey(
    "email",
    hashSecurityValue("contact-email", normalizedEmail),
  );
  const emailConfig = CONTACT_RATE_LIMITS.emailSuccesses;
  const emailResult = await store.incrementLimit(
    emailKey,
    emailConfig.limit,
    emailConfig.windowSeconds,
  );
  if (!emailResult.allowed) return { allowed: false, result: emailResult };

  const globalKey = rateKey("global", "all");
  const globalConfig = globalLimitConfig();
  const globalResult = await store.incrementLimit(
    globalKey,
    globalConfig.limit,
    globalConfig.windowSeconds,
  );
  if (!globalResult.allowed) {
    await store.releaseLimit(emailKey);
    return { allowed: false, result: globalResult };
  }

  return { allowed: true, reservation: { emailKey, globalKey } };
}

export async function releaseDeliveryLimits(
  store: SecurityStore,
  reservation: DeliveryLimitReservation,
) {
  await Promise.all([
    store.releaseLimit(reservation.emailKey),
    store.releaseLimit(reservation.globalKey),
  ]);
}
