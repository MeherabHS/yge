import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const DEVELOPMENT_SECRET =
  "yge-local-development-secret-not-valid-for-production";

export function getSecuritySecret() {
  const configured = process.env.YGE_SECURITY_SECRET;
  if (configured && configured.length >= 32) return configured;

  if (process.env.NODE_ENV === "production") {
    throw new Error("YGE_SECURITY_SECRET must contain at least 32 characters");
  }

  return DEVELOPMENT_SECRET;
}

export function hashSecurityValue(namespace: string, value: string) {
  return createHmac("sha256", getSecuritySecret())
    .update(namespace)
    .update("\0")
    .update(value)
    .digest("hex");
}

export function createSecurityToken() {
  return randomBytes(32).toString("base64url");
}

export function isValidSecurityToken(value: string | null) {
  return Boolean(value && /^[A-Za-z0-9_-]{43}$/.test(value));
}

export function timingSafeTokenEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}
