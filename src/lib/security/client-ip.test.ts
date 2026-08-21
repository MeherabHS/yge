import { afterEach, describe, expect, it, vi } from "vitest";
import { getClientSecurityIdentity, getVerifiedClientIp } from "./client-ip";

describe("trusted client IP handling", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("does not trust a caller-supplied x-forwarded-for by default", () => {
    const request = new Request("https://example.test", {
      headers: { "x-forwarded-for": "203.0.113.9" },
    });
    expect(getVerifiedClientIp(request)).toBeNull();
    expect(getClientSecurityIdentity(request)).toMatchObject({
      verified: false,
      source: "unverified",
    });
  });

  it("uses Vercel's overwritten x-forwarded-for value", () => {
    vi.stubEnv("VERCEL", "1");
    const request = new Request("https://example.test", {
      headers: { "x-forwarded-for": "203.0.113.9" },
    });
    expect(getVerifiedClientIp(request)).toBe("203.0.113.9");
    expect(getClientSecurityIdentity(request)).toMatchObject({
      identifier: expect.stringMatching(/^[a-f0-9]{64}$/),
      verified: true,
      source: "vercel",
    });
  });

  it.each(["203.0.113.9, 198.51.100.2", "not-an-ip", ""])(
    "rejects ambiguous or invalid proxy values: %s",
    (value) => {
      vi.stubEnv("VERCEL", "1");
      const request = new Request("https://example.test", {
        headers: { "x-forwarded-for": value },
      });
      expect(getVerifiedClientIp(request)).toBeNull();
    },
  );

  it("requires an explicit self-hosted trusted-proxy assertion", () => {
    vi.stubEnv("CONTACT_CLIENT_IP_HEADER", "x-real-ip");
    const request = new Request("https://example.test", {
      headers: { "x-real-ip": "2001:db8::1" },
    });
    expect(getVerifiedClientIp(request)).toBeNull();
    vi.stubEnv("CONTACT_TRUST_PROXY_HEADERS", "true");
    expect(getVerifiedClientIp(request)).toBe("2001:db8::1");
  });
});
