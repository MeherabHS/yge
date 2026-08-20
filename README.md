# Youth for a Green Earth (YGE) — Website Documentation

This repository contains the complete, production-grade website for **Youth for a Green Earth (YGE)**, built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

The site is built with **zero external CMS or database dependencies**. All content is managed directly via typed TypeScript files located in `src/content/`.

---

## Quick Start

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production
```bash
npm run build
npm run start
```

---

## Content Editing Guide (No Code Knowledge Required)

All content files are in `src/content/`. Every title, date, list item, image path, metric, and organization detail is controlled from these files.

### 1. How to Update Organization Information & Social Links
File: `src/content/site.ts`
- Edit `email`, `social` URLs, `motto`, or default metadata strings.
- **Featured Event**: To change which event is featured site-wide, update `featuredEventSlug` to match the target event's `slug` in `events.ts`.

### 2. How to Change the Green Genesis Date (or Any Event Date)
File: `src/content/events.ts`
- Find the event record (e.g. `green-genesis-2026`).
- Modify `currentDate` (e.g. `'2026-09-10'`), `endDate`, or `rescheduleNotice`.
- **Note**: Changing this single record updates the announcement bar, homepage event card, events listing, event detail page, and structured data automatically.

### 3. How to Add or Edit a Program
File: `src/content/programs.ts`
- Add a new object to the `programs` array matching the `Program` interface.
- Set `slug`, `title`, `category`, `status`, `summary`, `problem`, `response`, `activities`, and `outputs`.

### 4. Editing the Team Page

Team departments and profiles are managed in `src/content/team.ts`; normal updates do not require editing a React component.

1. Add the photograph to `public/images/team/`. PNG, JPG, JPEG and WebP files are supported.
2. Open `src/content/team.ts`.
3. Add a new member object or update the existing one.
4. Choose a `department` ID from `teamDepartments`.
5. Set `order` to control the member's position within that department.
6. Set `visible: true` (or `false` to hide a former member without deleting the record).
7. Run the site and confirm the responsive image crop. Adjust `photoPosition` if the face needs a different focal point.

Always provide the complete local file path in `photo`; the page does not append or assume a file extension. Use `photo: null` to show the editorial initials fallback.

```ts
{
  id: 'example-member',
  name: 'EXAMPLE MEMBER',
  role: 'Program Coordinator',
  department: 'events-programs',
  photo: '/images/team/example-member.jpg',
  photoAlt: 'Example Member, Program Coordinator at Youth for a Green Earth',
  photoPosition: 'center 25%',
  featured: false,
  vacant: false,
  visible: true,
  order: 4,
  requiresVerification: true,
}
```

### 5. How to Change Colours & Design Tokens
File: `src/app/globals.css`
- Core palette variables are defined under `@theme` and `:root`:
  - `--color-forest-ink`: `#071A14`
  - `--color-deep-moss`: `#123C2F`
  - `--color-warm-cream`: `#F5F1E7`
  - `--color-acid-leaf`: `#C8FF3D`
  - `--color-electric-teal`: `#00DDB3`
  - `--color-climate-coral`: `#FF5E56`
  - `--color-solar-yellow`: `#FFD23F`
  - `--color-future-violet`: `#8E6CFF`

### 6. How to Replace Images
File: `src/content/media.ts`
- Centralized mapping of all image paths used throughout the site. Update file paths here when real photography is ready to be uploaded to `public/images/`.

### 7. How to Add a Resource or PDF
File: `src/content/resources.ts`
- Add a new resource entry.
- Place the PDF in `public/pdfs/` and set `pdfPath: '/pdfs/your-file.pdf'`.
- If no PDF is provided, leave `pdfPath: undefined` — the site will automatically render a safe "PDF Coming Soon" badge without broken download buttons.

### 8. Contact Form / Brevo Setup

Contact copy, topics, verified social links, delivery mode, and endpoint are configured in `src/content/site.ts` under `contactConfig`.

The `/api/contact` route sends plain-text transactional email through Brevo. Copy `.env.example` to `.env.local` and provide:

- `BREVO_API_KEY`: a Brevo API v3 key.
- `BREVO_SENDER_EMAIL`: an address verified as a sender in Brevo.
- `BREVO_SENDER_NAME`: optional sender name (defaults to `YGE Website`).
- `BREVO_RECIPIENT_EMAIL`: optional recipient override (defaults to `youthforagreenearth@gmail.com`).

Without the required API key and verified sender, the form returns a clear configuration error and never displays a false success message. Restart the development server after changing environment variables.

---

## Architecture Overview

```
src/
├── app/                  # Next.js App Router routes & pages
│   ├── page.tsx          # Homepage
│   ├── about/            # About page
│   ├── work/             # Our Work archive & [slug] detail
│   ├── impact/           # Impact metrics & locations page
│   ├── stories/          # Stories publication archive & [slug] detail
│   ├── events/           # Events listing & [slug] detail
│   ├── resources/        # Resource library & [slug] detail
│   ├── team/             # Team page
│   ├── get-involved/     # Permanent redirect to /contact
│   ├── contact/          # Contact page & Brevo-ready form
│   ├── privacy/          # Draft privacy policy
│   └── safeguarding/     # Draft safeguarding & child protection policy
├── components/           # UI & section components
│   ├── layout/           # Navbar, Footer, AnnouncementBar
│   └── sections/         # Hero, Manifesto, Impact, Map, Docs, etc.
├── content/              # Local typed content layer
├── lib/                  # Utility functions
├── styles/               # Global CSS & Tailwind design tokens
└── types/                # Global TypeScript definitions
```

---

## License & Organization Notice
Developed for Youth for a Green Earth (YGE), Bangladesh.
"Transforming Awareness into Action"
