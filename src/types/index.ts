// ============================================================
// YGE — Global TypeScript Types
// ============================================================

export type ColorWorld =
  "forest" | "teal" | "coral" | "violet" | "cream" | "acid";

export type ProgramCategory =
  | "Education"
  | "Advocacy"
  | "Community"
  | "Campus"
  | "Publications"
  | "Creative Media"
  | "Events";

export type ProgramStatus = "Active" | "Completed" | "Upcoming" | "Ongoing";

export type EventStatus =
  "upcoming" | "ongoing" | "past" | "rescheduled" | "cancelled";

export type RegistrationStatus =
  "open" | "closed" | "coming-soon" | "not-required";

export type StoryType =
  | "Impact Story"
  | "Field Note"
  | "Campaign"
  | "Interview"
  | "Announcement"
  | "Event Recap";

export type ResourceType =
  | "Eco Paper"
  | "Report"
  | "Toolkit"
  | "Educational Material"
  | "Documentary"
  | "Campaign Material";

export type TeamRole =
  | "Founding Advisor"
  | "Advisor"
  | "Founder"
  | "Executive"
  | "Volunteer"
  | "Contributor";

export type PartnerRelationship =
  | "Organizer"
  | "Collaborator"
  | "Supporter"
  | "Sponsor"
  | "Media Partner"
  | "Technology Partner"
  | "Venue"
  | "Speaker Organization";

// ─── Program ────────────────────────────────────────────────

export interface Program {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: ProgramCategory;
  status: ProgramStatus;
  date: string; // ISO date or range
  location: string;
  coverImage: string;
  markerImage: string | null;
  markerAlt: string;
  markerPosition?: string;
  summary: string;
  problem: string;
  response: string;
  activities: string[];
  outputs: string[];
  gallery: string[];
  partnerSlugs: string[];
  relatedStorySlugs: string[];
  relatedResourceSlugs: string[];
  cta: {
    label: string;
    href: string;
  };
}

// ─── Event ──────────────────────────────────────────────────

export interface EventSegment {
  name: string;
  description?: string;
  prize?: string;
}

export interface YGEEvent {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  theme?: string;
  motto?: string;
  status: EventStatus;
  originalDate?: string; // ISO date
  startDate?: string;
  currentDate: string; // ISO date — the one shown everywhere
  endDate?: string;
  rescheduleNotice?: string;
  venue: string;
  city: string;
  country?: string;
  eligibility?: string;
  registrationStatus: RegistrationStatus;
  registrationUrl?: string;
  entryFee?: string;
  prizePool?: string;
  segments?: EventSegment[];
  organizers: string[];
  contactEmail?: string;
  externalUrl?: string;
  image?: string;
  coverImage: string;
  description: string;
  featured: boolean;
}

// ─── Story ──────────────────────────────────────────────────

export interface Story {
  slug: string;
  title: string;
  type: StoryType;
  date: string;
  readingTime: number; // minutes
  author: string;
  excerpt: string;
  heroImage: string;
  body: StoryBlock[];
  pullQuote?: string;
  relatedProgramSlug?: string;
  gallery?: string[];
  tags: string[];
  featured: boolean;
}

export type StoryBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

// ─── Resource ────────────────────────────────────────────────

export interface Resource {
  slug: string;
  title: string;
  type: ResourceType;
  author: string;
  designer?: string;
  publishedDate: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  coverAspectRatio?: string;
  pdfPath?: string; // undefined = no PDF yet
  tags: string[];
  featured: boolean;
}

// ─── Eco Paper ────────────────────────────────────────────────

export interface EcoPaper {
  id: string;
  slug: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  publicationDate: string | null;
  category: string;
  coverImage: string;
  coverAlt: string;
  coverAspectRatio?: string;
  documentUrl: string | null;
  authors: string[];
  topics: string[];
  featured: boolean;
  requiresVerification: boolean;
  /** Legacy display metadata retained for existing resource integrations. */
  seriesName: string;
  author: string;
  designer: string;
  publishedAt?: string | null;
  year?: number | null;
  excerpt?: string | null;
  pdfUrl?: string | null;
  status: "available" | "coming-soon";
}

// ─── Team Member ─────────────────────────────────────────────

export interface TeamMember {
  slug: string;
  name: string;
  role: TeamRole;
  title: string;
  bio: string;
  photo: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  requiresVerification: boolean; // never shown on frontend
}

// ─── Partner ─────────────────────────────────────────────────

export interface Partner {
  slug: string;
  name: string;
  shortName?: string;
  relationship: PartnerRelationship;
  logoPath?: string; // undefined = text wordmark
  url?: string;
  description?: string;
  /** Partner names and logo use require final organizational verification. */
  requiresVerification: boolean;
}

// ─── Impact ──────────────────────────────────────────────────

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  description: string;
  source: "verified" | "demo" | "awaiting-confirmation";
  programSlug?: string;
}

export interface ImpactLocation {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  activities: string[];
}

// ─── Navigation ──────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

// ─── Site Config ─────────────────────────────────────────────

export type FormMode = "demo" | "mailto" | "api";

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  motto: string;
  description: string;
  url: string;
  email: string;
  social: SocialLinks;
  ctas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    join: { label: string; href: string };
  };
  demoMode: boolean;
  formMode: FormMode;
  featuredEventSlug: string;
  defaultMeta: {
    title: string;
    description: string;
    ogImage: string;
  };
}
