# Youth for a Green Earth website

The official Youth for a Green Earth (YGE) website is a Next.js App Router application. Content is maintained in typed TypeScript files under `src/content`; there is no CMS or application database.

## Requirements

- Node.js 22 LTS (Next.js requires at least 20.9)
- npm 10 or newer

Use the version in `.nvmrc` when possible.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` only when testing contact delivery. Local secrets are ignored by Git.

## Quality checks

```bash
npm run check
```

The complete check formats, lints, type-checks, tests, audits production dependencies, and creates a production build. Pull requests and pushes to `main` run the same checks in GitHub Actions.

Individual commands are also available:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run audit
npm run build
```

## Production configuration

Configure these encrypted environment variables in the hosting provider:

- `NEXT_PUBLIC_SITE_URL`: canonical HTTPS origin.
- `BREVO_API_KEY`: Brevo transactional-email API key.
- `BREVO_SENDER_EMAIL`: verified Brevo sender address.
- `BREVO_SENDER_NAME`: optional sender label.
- `BREVO_RECIPIENT_EMAIL`: optional destination override.
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST endpoint.
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token.
- `YGE_SECURITY_SECRET`: at least 32 random server-only characters used to HMAC identifiers and token keys.
- `CONTACT_ALLOWED_ORIGINS`: optional exact comma-separated HTTPS staging origins. Production apex and `www` origins are built in.
- `CONTACT_GLOBAL_LIMIT` and `CONTACT_GLOBAL_WINDOW_SECONDS`: optional global successful-delivery ceiling; defaults to 100 per hour.

On Vercel, the application uses the platform-overwritten `x-forwarded-for` value. For a self-hosted reverse proxy, set `CONTACT_TRUST_PROXY_HEADERS=true` and `CONTACT_CLIENT_IP_HEADER=x-real-ip` only after Nginx overwrites that header, logs the verified address, and direct access to the Next.js origin is blocked.

The contact endpoint and token issuer fail closed in production when durable Redis or `YGE_SECURITY_SECRET` is not configured. They never fall back to instance-local state in production. Local development and automated tests use an isolated in-memory adapter.

The first-party contact controls are strict Origin checks, an HttpOnly `SameSite=Strict` `__Host-` CSRF cookie, a matching header token, a 30-minute single-use form token, a two-second server-side minimum completion time, an accessible off-screen trap field, atomic TTL limits, duplicate suppression, strict JSON/schema limits, and plain-text email delivery. No CAPTCHA, fingerprinting, or third-party bot-detection code is used.

The enforced page CSP uses a fresh nonce for Next.js hydration scripts and blocks inline script attributes. Because Next.js nonce support requires request-time rendering, pages are dynamically rendered instead of being served as fully static HTML; this trades CDN-cacheable HTML and the lowest possible TTFB for the requested strict script policy. Inline style attributes remain narrowly allowed because the existing Framer Motion and presentation components generate repository-controlled style attributes; submitted values never reach them.

This repository targets Vercel/serverless deployment, so Fail2ban is not installed or claimed as active. On a future Linux/Nginx host, verify restored client IPs and the access-log format before adding tested Fail2ban filters; application-level Redis controls remain mandatory.

Deployment itself is managed outside this repository. Before announcing a release, verify the canonical domain's DNS, TLS, environment settings, `/api/contact`, and all responsive layouts.

## Content maintenance

Organization details, social links, calls to action, and the featured-event slug live in `src/content/site.ts`. Programs, events, stories, resources, papers, and team members have dedicated files in the same directory.

### Team members

Team departments and profiles are maintained in `src/content/team.ts`.

1. Add a verified photograph under `public/images/team/` when one is available.
2. Add or update the typed member record.
3. Use a valid department ID and a unique order within that department.
4. Set `visible` explicitly and verify the responsive crop.
5. Run `npm run check` before publishing.

Use a complete public path for `photo`; use `null` for the editorial initials fallback. Removing personal data from the current branch does not remove it from existing Git history. History rewriting is a separate, coordinated privacy operation.

### Images and publications

Shared image paths are centralized in `src/content/media.ts`. Optimize raster assets before committing them and provide accurate dimensions and alternative text. Publication files belong under `public/pdfs/`; omit their path until a verified document exists.

## Architecture

```text
src/
├── app/             Routes, layouts, metadata, and API handlers
├── components/      Reusable presentation components
├── content/         Typed editorial content
├── lib/             Shared application and service logic
│   └── contact/     Contact validation, abuse controls, and delivery
└── types/           Shared domain types
```

Branded not-found and runtime-error components use Next.js error boundaries directly, preserving framework-managed HTTP status codes without a request interception layer.

## Security

See `SECURITY.md` for private vulnerability reporting. Never commit `.env` files, credentials, personal drafts, production exports, or browser-profile data.
