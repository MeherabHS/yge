const PRODUCTION_ORIGINS = [
  "https://youthforagreenearth.org",
  "https://www.youthforagreenearth.org",
] as const;

function configuredOrigins() {
  const origins = new Set<string>(PRODUCTION_ORIGINS);
  for (const candidate of (process.env.CONTACT_ALLOWED_ORIGINS ?? "").split(
    ",",
  )) {
    const value = candidate.trim();
    if (!value) continue;
    try {
      const parsed = new URL(value);
      const isLocalDevelopment =
        process.env.NODE_ENV !== "production" &&
        parsed.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
      if (
        parsed.origin === value &&
        (parsed.protocol === "https:" || isLocalDevelopment)
      ) {
        origins.add(value);
      }
    } catch {
      // Invalid configured origins are ignored, never broadened.
    }
  }

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }
  return origins;
}

export function isAllowedContactOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return false;
  try {
    const parsed = new URL(origin);
    return parsed.origin === origin && configuredOrigins().has(origin);
  } catch {
    return false;
  }
}

export function isAllowedTokenRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) return isAllowedContactOrigin(request);
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin") return true;
  return process.env.NODE_ENV !== "production" && !fetchSite;
}

export function readCookie(request: Request, name: string) {
  for (const part of (request.headers.get("cookie") ?? "").split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0) continue;
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim();
    }
  }
  return null;
}
