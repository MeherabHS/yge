import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CSRF_COOKIE_NAME, issueFormTokens } from "@/lib/contact/form-security";
import type { SecurityStore } from "@/lib/security/security-store";
import {
  MemorySecurityStore,
  setSecurityStoreForTests,
} from "@/lib/security/security-store";

const { deliverContactMessage, getContactDeliveryConfig } = vi.hoisted(() => ({
  deliverContactMessage: vi.fn(),
  getContactDeliveryConfig: vi.fn(),
}));

vi.mock("@/lib/contact/brevo", () => ({
  deliverContactMessage,
  getContactDeliveryConfig,
}));

import { POST } from "./route";
import { GET as GET_FORM_TOKEN } from "../security/form-token/route";

const validPayload = {
  name: "Samira Rahman",
  email: "samira@example.com",
  organization: "YGE",
  topic: "Events",
  message: "Hello from the YGE website.",
  addressLine2: "",
};

type Credentials = { csrfToken: string; formToken: string };
let store: MemorySecurityStore;

function request(
  body: unknown,
  credentials?: Credentials,
  headers: Record<string, string | undefined> = {},
) {
  const resolvedHeaders = new Headers({
    "content-type": "application/json",
    origin: "https://youthforagreenearth.org",
  });
  if (credentials) {
    resolvedHeaders.set("x-csrf-token", credentials.csrfToken);
    resolvedHeaders.set("x-form-token", credentials.formToken);
    resolvedHeaders.set(
      "cookie",
      `${CSRF_COOKIE_NAME}=${credentials.csrfToken}`,
    );
  }
  for (const [key, value] of Object.entries(headers)) {
    if (value === undefined) resolvedHeaders.delete(key);
    else resolvedHeaders.set(key, value);
  }
  return new Request("https://youthforagreenearth.org/api/contact", {
    method: "POST",
    headers: resolvedHeaders,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function credentials(wait = true) {
  const issued = await issueFormTokens(
    new Request("https://youthforagreenearth.org/contact"),
    store,
  );
  if (wait) vi.advanceTimersByTime(2_001);
  return { csrfToken: issued.csrfToken, formToken: issued.formToken };
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  store = new MemorySecurityStore();
  setSecurityStoreForTests(store);
  getContactDeliveryConfig.mockReturnValue({ apiKey: "redacted" });
  deliverContactMessage.mockResolvedValue(true);
});

afterEach(() => {
  setSecurityStoreForTests(undefined);
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("GET /api/security/form-token", () => {
  it("issues uncached first-party tokens and a strict __Host cookie", async () => {
    const response = await GET_FORM_TOKEN(
      new Request("https://youthforagreenearth.org/api/security/form-token", {
        headers: { "sec-fetch-site": "same-origin" },
      }),
    );
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      csrfToken: expect.stringMatching(/^[A-Za-z0-9_-]{43}$/),
      formToken: expect.stringMatching(/^[A-Za-z0-9_-]{43}$/),
      expiresAt: expect.any(Number),
    });
    expect(response.headers.get("cache-control")).toContain("no-store");
    expect(response.headers.get("set-cookie")).toContain(
      `${CSRF_COOKIE_NAME}=`,
    );
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("Secure");
    expect(response.headers.get("set-cookie")).toContain("SameSite=strict");
    expect(response.headers.get("set-cookie")).toContain("Path=/");
    expect(response.headers.get("set-cookie")).not.toContain("Domain=");
  });

  it("rejects a foreign token request", async () => {
    const response = await GET_FORM_TOKEN(
      new Request("https://youthforagreenearth.org/api/security/form-token", {
        headers: { origin: "https://attacker.example" },
      }),
    );
    expect(response.status).toBe(403);
  });
});

describe("POST /api/contact", () => {
  it("delivers a valid, slow, same-origin request", async () => {
    const response = await POST(request(validPayload, await credentials()));
    expect(response.status).toBe(201);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(deliverContactMessage).toHaveBeenCalledWith(
      expect.objectContaining({ email: "samira@example.com", topic: "Events" }),
      expect.anything(),
    );
  });

  it.each([
    ["missing", undefined],
    ["malicious", "https://attacker.example"],
    ["null", "null"],
    ["lookalike", "https://youthforagreenearth.org.attacker.example"],
  ])("rejects a %s Origin", async (_, origin) => {
    const response = await POST(request(validPayload, undefined, { origin }));
    expect(response.status).toBe(403);
    expect(deliverContactMessage).not.toHaveBeenCalled();
  });

  it("rejects a missing CSRF cookie", async () => {
    const token = await credentials();
    const response = await POST(
      request(validPayload, token, { cookie: undefined }),
    );
    expect(response.status).toBe(403);
  });

  it("rejects a missing CSRF header", async () => {
    const token = await credentials();
    const response = await POST(
      request(validPayload, token, { "x-csrf-token": undefined }),
    );
    expect(response.status).toBe(403);
  });

  it("rejects a mismatched CSRF token", async () => {
    const token = await credentials();
    const response = await POST(
      request(validPayload, token, {
        "x-csrf-token": "A".repeat(43),
      }),
    );
    expect(response.status).toBe(403);
  });

  it("rejects a missing one-time form token", async () => {
    const token = await credentials();
    const response = await POST(
      request(validPayload, token, { "x-form-token": undefined }),
    );
    expect(response.status).toBe(403);
  });

  it("rejects expired token state", async () => {
    const token = await credentials();
    vi.advanceTimersByTime(30 * 60 * 1_000);
    const response = await POST(request(validPayload, token));
    expect(response.status).toBe(403);
  });

  it("rejects a replayed form token", async () => {
    const token = await credentials();
    expect((await POST(request(validPayload, token))).status).toBe(201);
    expect((await POST(request(validPayload, token))).status).toBe(403);
    expect(deliverContactMessage).toHaveBeenCalledTimes(1);
  });

  it("rejects an impossibly fast submission", async () => {
    const response = await POST(
      request(validPayload, await credentials(false)),
    );
    expect(response.status).toBe(400);
    expect(deliverContactMessage).not.toHaveBeenCalled();
  });

  it("does not deliver a filled off-screen trap", async () => {
    const response = await POST(
      request({ ...validPayload, addressLine2: "automated" }),
    );
    expect(response.status).toBe(400);
    expect(deliverContactMessage).not.toHaveBeenCalled();
  });

  it("rejects a wrong Content-Type", async () => {
    const response = await POST(
      request(validPayload, undefined, { "content-type": "text/plain" }),
    );
    expect(response.status).toBe(415);
  });

  it("rejects a compressed body", async () => {
    const response = await POST(
      request(validPayload, undefined, { "content-encoding": "gzip" }),
    );
    expect(response.status).toBe(415);
  });

  it("rejects an oversized body before parsing", async () => {
    const response = await POST(
      request("x", undefined, { "content-length": "20000" }),
    );
    expect(response.status).toBe(413);
  });

  it.each([
    ["unknown field", { ...validPayload, admin: true }],
    [
      "prototype-pollution key",
      JSON.parse(
        `{"__proto__":"pollute",${JSON.stringify(validPayload).slice(1)}`,
      ),
    ],
    ["invalid topic", { ...validPayload, topic: "Unknown" }],
    ["invalid email", { ...validPayload, email: "invalid" }],
    [
      "header injection",
      { ...validPayload, name: "Samira\r\nBcc: bad@example.com" },
    ],
    ["null byte", { ...validPayload, message: "hello\u0000world" }],
  ])("rejects invalid input: %s", async (_, payload) => {
    const response = await POST(request(payload));
    expect(response.status).toBe(400);
    expect(deliverContactMessage).not.toHaveBeenCalled();
  });

  it.each([
    "<script>alert(1)</script>",
    "<img src=x onerror=alert(1)>",
    "</style><script>alert(1)</script>",
  ])(
    "passes malicious-looking message text only as plain text: %s",
    async (message) => {
      const token = await credentials();
      const response = await POST(request({ ...validPayload, message }, token));
      expect(response.status).toBe(201);
      expect(deliverContactMessage).toHaveBeenCalledWith(
        expect.objectContaining({ message }),
        expect.anything(),
      );
    },
  );

  it("returns Retry-After when the IP attempt limit is exceeded", async () => {
    for (let index = 0; index < 5; index += 1) {
      const token = await credentials();
      const response = await POST(
        request(
          {
            ...validPayload,
            email: `person${index}@example.com`,
            message: `Unique valid message number ${index}.`,
          },
          token,
        ),
      );
      expect(response.status).toBe(201);
    }
    const response = await POST(
      request(
        { ...validPayload, email: "sixth@example.com" },
        await credentials(),
      ),
    );
    expect(response.status).toBe(429);
    expect(Number(response.headers.get("retry-after"))).toBeGreaterThan(0);
  });

  it("limits successful deliveries by normalized email hash", async () => {
    for (let index = 0; index < 3; index += 1) {
      const response = await POST(
        request(
          { ...validPayload, message: `Unique valid message number ${index}.` },
          await credentials(),
        ),
      );
      expect(response.status).toBe(201);
    }
    const response = await POST(
      request(
        { ...validPayload, message: "A fourth unique valid message." },
        await credentials(),
      ),
    );
    expect(response.status).toBe(429);
  });

  it("applies the configurable global successful-delivery ceiling", async () => {
    vi.stubEnv("CONTACT_GLOBAL_LIMIT", "1");
    expect(
      (
        await POST(
          request(
            { ...validPayload, email: "first@example.com" },
            await credentials(),
          ),
        )
      ).status,
    ).toBe(201);
    const response = await POST(
      request(
        {
          ...validPayload,
          email: "second@example.com",
          message: "Another unique valid message.",
        },
        await credentials(),
      ),
    );
    expect(response.status).toBe(429);
  });

  it("fails closed when the durable store fails", async () => {
    setSecurityStoreForTests({
      incrementLimit: vi.fn().mockRejectedValue(new Error("unavailable")),
    } as unknown as SecurityStore);
    const response = await POST(request(validPayload));
    expect(response.status).toBe(503);
    expect(deliverContactMessage).not.toHaveBeenCalled();
  });

  it("returns a generic failure and releases delivery counters when Brevo fails", async () => {
    deliverContactMessage.mockResolvedValue(false);
    const response = await POST(request(validPayload, await credentials()));
    expect(response.status).toBe(502);
    expect(JSON.stringify(await response.json())).not.toContain("Brevo");
  });

  it("suppresses duplicate content submitted with a new token", async () => {
    expect(
      (await POST(request(validPayload, await credentials()))).status,
    ).toBe(201);
    const response = await POST(request(validPayload, await credentials()));
    expect(response.status).toBe(409);
    expect(deliverContactMessage).toHaveBeenCalledTimes(1);
  });

  it("does not put sensitive form content in security logs", async () => {
    const log = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    await POST(
      request({
        ...validPayload,
        addressLine2: "secret trap value",
        message: "private message content",
      }),
    );
    expect(JSON.stringify(log.mock.calls)).not.toContain(
      "private message content",
    );
    expect(JSON.stringify(log.mock.calls)).not.toContain("samira@example.com");
  });
});
