import { isIP } from "node:net";
import { hashSecurityValue } from "./crypto";

export type ClientSecurityIdentity = {
  identifier: string;
  verified: boolean;
  source: "vercel" | "trusted-proxy" | "unverified";
};

const HEADER_NAME_PATTERN = /^[a-z0-9-]+$/;

function verifiedHeaderName() {
  if (process.env.VERCEL) return "x-forwarded-for";

  if (process.env.CONTACT_TRUST_PROXY_HEADERS !== "true") return null;
  const header = process.env.CONTACT_CLIENT_IP_HEADER?.trim().toLowerCase();
  return header && HEADER_NAME_PATTERN.test(header) ? header : null;
}

export function getVerifiedClientIp(request: Request) {
  const header = verifiedHeaderName();
  if (!header) return null;

  const value = request.headers.get(header)?.trim();
  if (!value || value.includes(",") || isIP(value) === 0) return null;
  return value;
}

export function getClientSecurityIdentity(
  request: Request,
): ClientSecurityIdentity {
  const verifiedIp = getVerifiedClientIp(request);
  if (!verifiedIp) {
    return {
      identifier: hashSecurityValue("client-ip", "unverified-client"),
      verified: false,
      source: "unverified",
    };
  }

  return {
    identifier: hashSecurityValue("client-ip", verifiedIp),
    verified: true,
    source: process.env.VERCEL ? "vercel" : "trusted-proxy",
  };
}
