import { describe, expect, it } from "vitest";
import { buildContentSecurityPolicy } from "./csp";
import { serializeTrustedJsonLd } from "./json-ld";

describe("Content Security Policy", () => {
  it("enforces nonce-based scripts without unsafe inline or eval", () => {
    const policy = buildContentSecurityPolicy("test-nonce", false);
    expect(policy).toContain(
      "script-src 'self' 'nonce-test-nonce' 'strict-dynamic'",
    );
    expect(policy).toContain("script-src-attr 'none'");
    expect(policy).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    expect(policy).not.toContain("'unsafe-eval'");
    expect(policy).not.toContain("*");
  });

  it("keeps the narrow verified style-attribute exception", () => {
    const policy = buildContentSecurityPolicy("test-nonce", false);
    expect(policy).toContain("style-src-attr 'unsafe-inline'");
    expect(policy).toContain("style-src-elem 'self' 'nonce-test-nonce'");
  });
});

describe("trusted JSON-LD serialization", () => {
  it("prevents a script-closing payload from becoming markup", () => {
    const serialized = serializeTrustedJsonLd({
      value: "</script><script>alert(1)</script>",
    });
    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c/script>");
  });
});
