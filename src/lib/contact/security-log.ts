export type ContactSecurityEvent = {
  requestId: string;
  route: "/api/contact" | "/api/security/form-token";
  statusCategory: string;
  hashedIp?: string;
  rateLimit?: "allowed" | "blocked" | "unavailable";
  csrf?: "valid" | "invalid";
  formToken?: "valid" | "invalid" | "replayed";
  honeypot?: "empty" | "filled";
};

export function logContactSecurityEvent(event: ContactSecurityEvent) {
  console.warn("contact_security_event", {
    timestamp: new Date().toISOString(),
    ...event,
  });
}
