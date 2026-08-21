import { afterEach, describe, expect, it, vi } from "vitest";
import { MemorySecurityStore } from "./security-store";

describe("provider-neutral security store", () => {
  afterEach(() => vi.useRealTimers());

  it("issues, verifies, and atomically consumes a one-time token", async () => {
    const store = new MemorySecurityStore();
    const record = {
      issuedAt: 1_000,
      expiresAt: 31_000,
      context: "context",
      used: false,
    };
    expect(await store.issueTokenPair("csrf", "form", record, 30)).toBe(true);
    expect(await store.hasCsrfToken("csrf")).toBe(true);
    expect(await store.getFormToken("form")).toEqual(record);
    expect(await store.consumeFormToken("form", record, "duplicate", 60)).toBe(
      "consumed",
    );
    expect(await store.getFormToken("form")).toMatchObject({ used: true });
    expect(await store.consumeFormToken("form", record, "duplicate", 60)).toBe(
      "changed",
    );
  });

  it("enforces bounded TTL counters and removes expired state", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const store = new MemorySecurityStore();
    expect(await store.incrementLimit("ip", 1, 10)).toMatchObject({
      allowed: true,
    });
    expect(await store.incrementLimit("ip", 1, 10)).toMatchObject({
      allowed: false,
    });
    vi.advanceTimersByTime(10_001);
    expect(await store.incrementLimit("ip", 1, 10)).toMatchObject({
      allowed: true,
    });
  });

  it("blocks duplicate content even when a different token is used", async () => {
    const store = new MemorySecurityStore();
    const first = { issuedAt: 1, expiresAt: 10, context: "a", used: false };
    const second = { issuedAt: 2, expiresAt: 10, context: "b", used: false };
    await store.issueTokenPair("csrf-1", "form-1", first, 60);
    await store.issueTokenPair("csrf-2", "form-2", second, 60);
    expect(await store.consumeFormToken("form-1", first, "same", 60)).toBe(
      "consumed",
    );
    expect(await store.consumeFormToken("form-2", second, "same", 60)).toBe(
      "duplicate",
    );
  });
});
