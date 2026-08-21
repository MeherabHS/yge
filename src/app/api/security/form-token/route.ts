import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  CSRF_COOKIE_NAME,
  FORM_TOKEN_TTL_SECONDS,
  issueFormTokens,
} from "@/lib/contact/form-security";
import { checkTokenIssue } from "@/lib/contact/rate-limit";
import { isAllowedTokenRequest } from "@/lib/contact/request-security";
import { logContactSecurityEvent } from "@/lib/contact/security-log";
import { getClientSecurityIdentity } from "@/lib/security/client-ip";
import { getSecurityStore } from "@/lib/security/security-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unavailable(requestId: string) {
  return NextResponse.json(
    { error: "Form security is temporarily unavailable." },
    {
      status: 503,
      headers: { "cache-control": "no-store", "x-request-id": requestId },
    },
  );
}

export async function GET(request: Request) {
  const requestId = randomUUID();
  if (!isAllowedTokenRequest(request)) {
    return NextResponse.json(
      { error: "Unable to process this request." },
      {
        status: 403,
        headers: { "cache-control": "no-store", "x-request-id": requestId },
      },
    );
  }

  try {
    const store = getSecurityStore();
    const identity = getClientSecurityIdentity(request);
    const tokenIssueLimit = await checkTokenIssue(store, identity.identifier);
    if (!tokenIssueLimit.allowed) {
      logContactSecurityEvent({
        requestId,
        route: "/api/security/form-token",
        statusCategory: "rate-limited",
        hashedIp: identity.identifier,
        rateLimit: "blocked",
      });
      return NextResponse.json(
        { error: "Please wait before requesting another form." },
        {
          status: 429,
          headers: {
            "cache-control": "no-store",
            "retry-after": String(tokenIssueLimit.retryAfter),
            "x-request-id": requestId,
          },
        },
      );
    }

    const issued = await issueFormTokens(request, store);

    const response = NextResponse.json(
      {
        csrfToken: issued.csrfToken,
        formToken: issued.formToken,
        expiresAt: issued.expiresAt,
      },
      {
        status: 200,
        headers: {
          "cache-control": "no-store, max-age=0",
          pragma: "no-cache",
          "x-request-id": requestId,
        },
      },
    );
    response.cookies.set(CSRF_COOKIE_NAME, issued.csrfToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      maxAge: FORM_TOKEN_TTL_SECONDS,
    });
    return response;
  } catch {
    logContactSecurityEvent({
      requestId,
      route: "/api/security/form-token",
      statusCategory: "store-unavailable",
      rateLimit: "unavailable",
    });
    return unavailable(requestId);
  }
}
