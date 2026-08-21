import { describe, expect, it } from "vitest";
import { validateContactPayload } from "./validation";

const topics = ["General", "Events"];
const validPayload = {
  name: "Samira Rahman",
  email: "SAMIRA@EXAMPLE.COM",
  organization: "YGE",
  topic: "Events",
  message: "Hello from YGE.",
  addressLine2: "",
};

describe("validateContactPayload", () => {
  it("normalizes valid plain-text contact data", () => {
    expect(
      validateContactPayload(
        {
          ...validPayload,
          name: "  Samira Rahman ",
          message: " Hello from YGE. ",
        },
        topics,
      ),
    ).toEqual({
      success: true,
      message: {
        name: "Samira Rahman",
        email: "samira@example.com",
        organization: "YGE",
        topic: "Events",
        message: "Hello from YGE.",
      },
    });
  });

  it.each([
    ["unknown fields", { ...validPayload, role: "admin" }],
    ["nested values", { ...validPayload, name: { value: "Samira" } }],
    ["arrays", { ...validPayload, message: ["hello"] }],
    [
      "prototype key",
      JSON.parse(
        `{"__proto__":"pollute",${JSON.stringify(validPayload).slice(1)}`,
      ),
    ],
    ["constructor key", { ...validPayload, constructor: "pollute" }],
    ["null byte", { ...validPayload, message: "hello\u0000world" }],
    [
      "header injection",
      { ...validPayload, name: "Samira\r\nBcc: bad@example.com" },
    ],
    ["malformed Unicode", { ...validPayload, message: "message text \ud800" }],
  ])("rejects malformed input: %s", (_, payload) => {
    expect(validateContactPayload(payload, topics)).toMatchObject({
      success: false,
    });
  });

  it.each([
    ["email", { ...validPayload, email: "not-an-email" }],
    ["topic", { ...validPayload, topic: "Unapproved" }],
    ["short name", { ...validPayload, name: "A" }],
    ["short message", { ...validPayload, message: "short" }],
  ])("rejects invalid %s", (_, payload) => {
    expect(validateContactPayload(payload, topics)).toMatchObject({
      success: false,
      honeypot: false,
    });
  });

  it("rejects a filled off-screen trap without field details", () => {
    expect(
      validateContactPayload({ ...validPayload, addressLine2: "bot" }, topics),
    ).toEqual({
      success: false,
      fieldErrors: {},
      honeypot: true,
      malformed: false,
    });
  });

  it.each([
    "<script>alert(1)</script>",
    "<img src=x onerror=alert(1)>",
    "</style><script>alert(1)</script>",
  ])("keeps message payloads as plain text: %s", (message) => {
    const result = validateContactPayload({ ...validPayload, message }, topics);
    expect(result).toMatchObject({ success: true, message: { message } });
  });
});
