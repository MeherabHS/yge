import { getClientSecurityIdentity } from "@/lib/security/client-ip";
import {
  createSecurityToken,
  hashSecurityValue,
  isValidSecurityToken,
  timingSafeTokenEqual,
} from "@/lib/security/crypto";
import {
  getSecurityStore,
  type FormTokenRecord,
  type SecurityStore,
} from "@/lib/security/security-store";
import { readCookie } from "./request-security";

export const CSRF_COOKIE_NAME = "__Host-yge-csrf";
export const CSRF_HEADER_NAME = "x-csrf-token";
export const FORM_TOKEN_HEADER_NAME = "x-form-token";
export const FORM_TOKEN_TTL_SECONDS = 30 * 60;
export const MINIMUM_SUBMISSION_TIME_MS = 2_000;
export const DUPLICATE_TTL_SECONDS = 60 * 60;

function csrfKey(token: string) {
  return `csrf:${hashSecurityValue("csrf-token", token)}`;
}

function formKey(token: string) {
  return `form:${hashSecurityValue("form-token", token)}`;
}

function securityContext(ipIdentifier: string, csrfToken: string) {
  return hashSecurityValue(
    "form-context",
    `${ipIdentifier}:${hashSecurityValue("csrf-token", csrfToken)}`,
  );
}

export async function issueFormTokens(
  request: Request,
  store: SecurityStore = getSecurityStore(),
) {
  const identity = getClientSecurityIdentity(request);
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const csrfToken = createSecurityToken();
    const formToken = createSecurityToken();
    const issuedAt = Date.now();
    const record: FormTokenRecord = {
      issuedAt,
      expiresAt: issuedAt + FORM_TOKEN_TTL_SECONDS * 1_000,
      context: securityContext(identity.identifier, csrfToken),
      used: false,
    };
    if (
      await store.issueTokenPair(
        csrfKey(csrfToken),
        formKey(formToken),
        record,
        FORM_TOKEN_TTL_SECONDS,
      )
    ) {
      return { csrfToken, formToken, expiresAt: record.expiresAt, identity };
    }
  }
  throw new Error("Unable to allocate unique form tokens");
}

export type VerifiedFormSecurity = {
  formStoreKey: string;
  record: FormTokenRecord;
  identity: ReturnType<typeof getClientSecurityIdentity>;
};

export async function verifyFormSecurity(
  request: Request,
  store: SecurityStore = getSecurityStore(),
): Promise<
  | { ok: true; value: VerifiedFormSecurity }
  | { ok: false; reason: "csrf" | "form" | "expired" | "too-fast" }
> {
  const csrfHeader = request.headers.get(CSRF_HEADER_NAME);
  const csrfCookie = readCookie(request, CSRF_COOKIE_NAME);
  if (
    !isValidSecurityToken(csrfHeader) ||
    !isValidSecurityToken(csrfCookie) ||
    !timingSafeTokenEqual(csrfHeader!, csrfCookie!) ||
    !(await store.hasCsrfToken(csrfKey(csrfHeader!)))
  ) {
    return { ok: false, reason: "csrf" };
  }

  const formToken = request.headers.get(FORM_TOKEN_HEADER_NAME);
  if (!isValidSecurityToken(formToken)) return { ok: false, reason: "form" };
  const key = formKey(formToken!);
  const record = await store.getFormToken(key);
  if (!record || record.used) return { ok: false, reason: "form" };

  const now = Date.now();
  if (record.expiresAt <= now) return { ok: false, reason: "expired" };
  if (now - record.issuedAt < MINIMUM_SUBMISSION_TIME_MS) {
    return { ok: false, reason: "too-fast" };
  }

  const identity = getClientSecurityIdentity(request);
  if (record.context !== securityContext(identity.identifier, csrfHeader!)) {
    return { ok: false, reason: "form" };
  }
  return { ok: true, value: { formStoreKey: key, record, identity } };
}

export function createDuplicateKey(content: string) {
  return `duplicate:${hashSecurityValue("contact-message", content)}`;
}
