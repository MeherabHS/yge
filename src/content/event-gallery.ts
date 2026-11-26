import { media } from "@/content/media";

export type EventPhotoFormat = "png" | "jpg" | "jpeg" | "webp";
export type EventGalleryCategory =
  "competition" | "workshop" | "campaign" | "talk" | "other";
export type EventGalleryLayout =
  "wide" | "landscape" | "portrait" | "square" | "small";

export interface EventGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  eventTitle?: string;
  location?: string;
  date?: string;
  year?: number;
  category: EventGalleryCategory;
  layout: EventGalleryLayout;
  objectPosition?: string;
  placeholder?: boolean;
  visible?: boolean;
  order: number;
  requiresVerification: boolean;
}

export type PublicEventGalleryPhoto = Omit<
  EventGalleryPhoto,
  "requiresVerification"
>;

export interface EventAlbum {
  id: string;
  slug: string;
  title: string | null;
  location?: string;
  date?: string;
  coverImages: string[];
  photoCount?: number;
  category?: string;
  visible?: boolean;
  order: number;
  requiresVerification: boolean;
}

export interface EventArchiveFrame {
  id: string;
  number: string;
  src: string;
  alt: string;
  objectPosition?: string;
  placeholder?: boolean;
  visible?: boolean;
  order: number;
  requiresVerification: boolean;
}

// Real YGE photographs only. The gallery leans on YGE's own sessions,
// campaigns and member gatherings, with only a few frames from partner events.
const photo = (
  p: Omit<EventGalleryPhoto, "visible" | "requiresVerification">,
): EventGalleryPhoto => ({ ...p, visible: true, requiresVerification: false });

export const eventGalleryPhotos: EventGalleryPhoto[] = [
  photo({
    id: "yge-members",
    src: "/images/events/gallery/yge-members.jpg",
    alt: "YGE members in green lanyards gather around a guest for a group photo.",
    caption: "YGE members together",
    category: "other",
    layout: "wide",
    order: 1,
  }),
  photo({
    id: "madrasa-session",
    src: "/images/events/gallery/madrasa-session.jpg",
    alt: "YGE volunteers lead an awareness session with young madrasa students seated on the floor.",
    caption: "Awareness session with madrasa students",
    category: "workshop",
    layout: "landscape",
    order: 2,
  }),
  photo({
    id: "lga-winners",
    src: "/images/stories/lga-photo-winners.jpg",
    alt: "Young prize winners hold up their nature drawings and certificates with YGE volunteers.",
    caption: "Little Green Artists winners",
    location: "Dhaka",
    year: 2025,
    category: "competition",
    layout: "landscape",
    order: 8,
  }),
  photo({
    id: "letters-session",
    src: "/images/events/gallery/letters-to-nature.jpg",
    alt: "Participants write handwritten messages in Bangla on yellow cards around a wooden table.",
    caption: "Handwritten messages at a YGE youth session",
    category: "workshop",
    layout: "small",
    order: 4,
  }),
  photo({
    id: "acps-3r",
    src: "/images/stories/acps-eco-bin-system.jpg",
    alt: "A YGE volunteer presents the 3R Eco Bin waste management system to school students.",
    caption: "3R session at Adamjee Cantonment Public School",
    location: "Dhaka",
    date: "3 May",
    year: 2025,
    category: "workshop",
    layout: "small",
    order: 5,
  }),
  photo({
    id: "youth-session-stage",
    src: "/images/events/gallery/youth-summit-stage.jpg",
    alt: "YGE members in green lanyards stand on stage with guests after a youth climate session.",
    caption: "YGE members with guests after a youth session",
    category: "talk",
    layout: "portrait",
    order: 6,
  }),
  photo({
    id: "climate-strike-2025",
    src: "/images/stories/gcs-2025-team.jpg",
    alt: "YGE volunteers hold a Don't Sell Our Future banner in front of the National Parliament building.",
    caption: "Global Climate Strike 2025",
    location: "Manik Mia Avenue, Dhaka",
    date: "11 April",
    year: 2025,
    category: "campaign",
    layout: "landscape",
    order: 7,
  }),
  photo({
    id: "gg2026-hosts",
    src: "/images/events/gallery/gg2026-hosts.jpg",
    alt: "YGE hosts smile at the lectern in front of the Green Genesis 2026 screen.",
    caption: "YGE hosts on the Green Genesis 2026 stage",
    location: "BRAC University",
    year: 2026,
    category: "competition",
    layout: "small",
    order: 3,
  }),
  photo({
    id: "gg2026-organisers",
    src: "/images/events/gallery/gg2026-organisers.jpg",
    alt: "YGE organisers in Green Genesis lanyards talk outside the auditorium.",
    caption: "YGE organisers behind the scenes at Green Genesis 2026",
    location: "BRAC University",
    year: 2026,
    category: "other",
    layout: "small",
    order: 9,
  }),
  photo({
    id: "ambassador-session",
    src: "/images/stories/ambassadors-team.jpg",
    alt: "The YGE organising team introduces itself to Green Genesis campus ambassadors.",
    caption: "YGE team meets the Green Genesis campus ambassadors",
    date: "17 July",
    year: 2026,
    category: "talk",
    layout: "wide",
    order: 10,
  }),
];

export const eventAlbums: EventAlbum[] = [
  {
    id: "album-placeholder-01",
    slug: "event-album-01",
    title: null,
    coverImages: [
      media.events.placeholders.landscape,
      media.events.placeholders.small,
    ],
    visible: true,
    order: 1,
    requiresVerification: true,
  },
  {
    id: "album-placeholder-02",
    slug: "event-album-02",
    title: null,
    coverImages: [
      media.events.placeholders.square,
      media.events.placeholders.landscape,
    ],
    visible: true,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "album-placeholder-03",
    slug: "event-album-03",
    title: null,
    coverImages: [
      media.events.placeholders.small,
      media.events.placeholders.wide,
    ],
    visible: true,
    order: 3,
    requiresVerification: true,
  },
];

export const eventArchiveFrames: EventArchiveFrame[] = [
  {
    id: "archive-lga-photo-saplings",
    number: "01",
    src: "/images/stories/lga-photo-saplings.jpg",
    alt: "Primary school students hold the saplings they took home from Little Green Artists.",
    visible: true,
    order: 1,
    requiresVerification: false,
  },
  {
    id: "archive-gcs-2025-placards",
    number: "02",
    src: "/images/stories/gcs-2025-placards.jpg",
    alt: "Hand-painted climate placards at the Global Climate Strike 2025.",
    visible: true,
    order: 2,
    requiresVerification: false,
  },
  {
    id: "archive-acps-ideas-board",
    number: "03",
    src: "/images/stories/acps-ideas-board.jpg",
    alt: "A board of students' sticky-note ideas for a greener campus.",
    visible: true,
    order: 3,
    requiresVerification: false,
  },
  {
    id: "archive-lga-photo-portrait",
    number: "04",
    src: "/images/stories/lga-photo-portrait.jpg",
    alt: "A young student holds a flowering sapling and a recycling activity pack.",
    visible: true,
    order: 4,
    requiresVerification: false,
  },
  {
    id: "archive-gcs-2025-sit-in",
    number: "05",
    src: "/images/stories/gcs-2025-sit-in.jpg",
    alt: "Young protesters sit in on Manik Mia Avenue during the climate strike.",
    visible: true,
    order: 5,
    requiresVerification: false,
  },
  {
    id: "archive-acps-certificate",
    number: "06",
    src: "/images/stories/acps-certificate.jpg",
    alt: "A student environment club leader receives a certificate of recognition.",
    visible: true,
    order: 6,
    requiresVerification: false,
  },
];

export const eventGalleryCategories: Array<{
  value: "all" | EventGalleryCategory;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "competition", label: "Competitions" },
  { value: "workshop", label: "Workshops" },
  { value: "campaign", label: "Campaigns" },
  { value: "talk", label: "Talks" },
];

export function getPublicEventGalleryPhotos(): PublicEventGalleryPhoto[] {
  return eventGalleryPhotos.map((photo) => {
    const publicPhoto: PublicEventGalleryPhoto = {
      id: photo.id,
      src: photo.src,
      alt: photo.alt,
      caption: photo.caption,
      eventTitle: photo.eventTitle,
      location: photo.location,
      date: photo.date,
      year: photo.year,
      category: photo.category,
      layout: photo.layout,
      objectPosition: photo.objectPosition,
      placeholder: photo.placeholder,
      visible: photo.visible,
      order: photo.order,
    };
    return publicPhoto;
  });
}
