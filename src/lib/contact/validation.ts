import type { ContactPayload, ContactValidationResult } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const FORBIDDEN_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const ALLOWED_KEYS = new Set([
  "name",
  "email",
  "organization",
  "topic",
  "message",
  "addressLine2",
]);
const METADATA_CONTROL_PATTERN = /[\u0000-\u001F\u007F]/u;
const MESSAGE_CONTROL_PATTERN =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u;
const UNPAIRED_SURROGATE_PATTERN =
  /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]/u;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().normalize("NFC") : null;
}

function invalidText(value: string, allowNewlines = false) {
  return (
    UNPAIRED_SURROGATE_PATTERN.test(value) ||
    (allowNewlines
      ? MESSAGE_CONTROL_PATTERN.test(value)
      : METADATA_CONTROL_PATTERN.test(value))
  );
}

function invalidShape(
  payload: unknown,
): payload is Exclude<unknown, ContactPayload> {
  if (!isPlainObject(payload)) return true;
  return Object.keys(payload).some(
    (key) => FORBIDDEN_KEYS.has(key) || !ALLOWED_KEYS.has(key),
  );
}

export function validateContactPayload(
  payload: unknown,
  inquiryTopics: readonly string[],
): ContactValidationResult {
  if (invalidShape(payload)) {
    return {
      success: false,
      fieldErrors: {},
      honeypot: false,
      malformed: true,
    };
  }

  const input = payload as ContactPayload;
  const trap = cleanString(input.addressLine2);
  if (trap) {
    return {
      success: false,
      fieldErrors: {},
      honeypot: true,
      malformed: false,
    };
  }

  const name = cleanString(input.name);
  const email = cleanString(input.email)?.toLowerCase() ?? null;
  const organization = cleanString(input.organization) ?? "";
  const topic = cleanString(input.topic);
  const message = cleanString(input.message);
  const fieldErrors: Record<string, string> = {};
  let malformed = false;

  if (
    name === null ||
    email === null ||
    topic === null ||
    message === null ||
    (input.organization !== undefined &&
      typeof input.organization !== "string") ||
    (input.addressLine2 !== undefined && typeof input.addressLine2 !== "string")
  ) {
    malformed = true;
  }

  if (!name || name.length < 2 || name.length > 100 || invalidText(name)) {
    fieldErrors.name = "Please enter a valid full name.";
  }
  if (
    !email ||
    email.length > 254 ||
    invalidText(email) ||
    !EMAIL_PATTERN.test(email)
  ) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (organization.length > 150 || invalidText(organization)) malformed = true;
  if (!topic || invalidText(topic) || !inquiryTopics.includes(topic)) {
    fieldErrors.topic = "Please select an inquiry topic.";
  }
  if (
    !message ||
    message.length < 10 ||
    message.length > 5_000 ||
    invalidText(message, true)
  ) {
    fieldErrors.message =
      "Please enter a message between 10 and 5,000 characters.";
  }

  if (malformed || Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors, honeypot: false, malformed };
  }

  return {
    success: true,
    message: {
      name: name!,
      email: email!,
      organization,
      topic: topic!,
      message: message!,
    },
  };
}
