import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isAllowedContactOrigin,
  isAllowedTokenRequest,
  readCookie,
} from "./request-security";

function request(origin?: string) {
  return new Request("https://youthforagreenearth.org/api/contact", {
    headers: origin === undefined ? {} : { origin },
  });
}

describe("contact request security", () => {
  afterEach(() => vi.unstubAllEnvs());

  it.each([
    undefined,
    "null",
    "not a URL",
    "https://attacker.example",
    "https://youthforagreenearth.org.attacker.example",
    "http://youthforagreenearth.org",
    "https://youthforagreenearth.org:444",
    "https://youthforagreenearth.org/",
  ])("rejects an unapproved submission Origin: %s", (origin) => {
    expect(isAllowedContactOrigin(request(origin))).toBe(false);
  });

  it.each([
    "https://youthforagreenearth.org",
    "https://www.youthforagreenearth.org",
  ])("accepts an exact production Origin: %s", (origin) => {
    expect(isAllowedContactOrigin(request(origin))).toBe(true);
  });

  it("accepts only valid configured HTTPS staging origins", () => {
    vi.stubEnv(
      "CONTACT_ALLOWED_ORIGINS",
      "https://preview.example.org, javascript:bad, https://preview.example.org/",
    );
    expect(isAllowedContactOrigin(request("https://preview.example.org"))).toBe(
      true,
    );
    expect(isAllowedContactOrigin(request("javascript:bad"))).toBe(false);
  });

  it("allows same-origin browser token GETs without relying on Host", () => {
    const tokenRequest = new Request(
      "https://youthforagreenearth.org/api/security/form-token",
      { headers: { "sec-fetch-site": "same-origin" } },
    );
    expect(isAllowedTokenRequest(tokenRequest)).toBe(true);
  });

  it("parses only the exact cookie name", () => {
    const cookieRequest = new Request("https://example.test", {
      headers: { cookie: "other=1; __Host-yge-csrf=token_value" },
    });
    expect(readCookie(cookieRequest, "__Host-yge-csrf")).toBe("token_value");
  });
});
