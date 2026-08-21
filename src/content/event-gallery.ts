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

const placeholderAlt =
  "Neutral archival-paper placeholder for future verified YGE event photography.";

export const eventGalleryPhotos: EventGalleryPhoto[] = [
  {
    id: "gallery-placeholder-01",
    src: media.events.placeholders.wide,
    alt: placeholderAlt,
    category: "other",
    layout: "wide",
    placeholder: true,
    visible: true,
    order: 1,
    requiresVerification: true,
  },
  {
    id: "gallery-placeholder-02",
    src: media.events.placeholders.landscape,
    alt: placeholderAlt,
    category: "other",
    layout: "landscape",
    placeholder: true,
    visible: true,
    order: 2,
    requiresVerification: true,
  },
  {
    id: "gallery-placeholder-03",
    src: media.events.placeholders.landscape,
    alt: placeholderAlt,
    category: "other",
    layout: "landscape",
    placeholder: true,
    visible: true,
    order: 3,
    requiresVerification: true,
  },
  {
    id: "gallery-placeholder-04",
    src: media.events.placeholders.small,
    alt: placeholderAlt,
    category: "other",
    layout: "small",
    placeholder: true,
    visible: true,
    order: 4,
    requiresVerification: true,
  },
  {
    id: "gallery-placeholder-05",
    src: media.events.placeholders.square,
    alt: placeholderAlt,
    category: "other",
    layout: "small",
    placeholder: true,
    visible: true,
    order: 5,
    requiresVerification: true,
  },
  {
    id: "gallery-placeholder-06",
    src: media.events.placeholders.portrait,
    alt: placeholderAlt,
    category: "other",
    layout: "portrait",
    placeholder: true,
    visible: true,
    order: 6,
    requiresVerification: true,
  },
  {
    id: "gallery-placeholder-07",
    src: media.events.placeholders.landscape,
    alt: placeholderAlt,
    category: "other",
    layout: "small",
    placeholder: true,
    visible: true,
    order: 7,
    requiresVerification: true,
  },
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

export const eventArchiveFrames: EventArchiveFrame[] = Array.from(
  { length: 6 },
  (_, index) => ({
    id: `archive-placeholder-${String(index + 1).padStart(2, "0")}`,
    number: String(index + 1).padStart(2, "0"),
    src:
      index % 2 === 0
        ? media.events.placeholders.landscape
        : media.events.placeholders.small,
    alt: placeholderAlt,
    placeholder: true,
    visible: true,
    order: index + 1,
    requiresVerification: true,
  }),
);

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
