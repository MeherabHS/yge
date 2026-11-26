// ============================================================
// YGE â€” Media / Image Paths
// To replace any image: change the path here.
// All image references in the UI pull from this file.
// ============================================================

export const media = {
  // Official organization mark. The JPG is the preserved source; the WebP is
  // a whitespace-trimmed, transparent presentation derivative for dark UI.
  brand: {
    officialLogo: "/images/brand/yge-official-logo.webp",
    officialLogoSource: "/images/brand/yge-official-logo.jpg",
  },

  // â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  heroCollage: "/images/hero/hero-collage.jpg",
  heroDeltaCollage: "/images/hero/delta-collage.webp",
  aboutDeltaCollage: "/images/hero/about-delta-collage.webp",
  aboutDeltaCropped: "/images/hero/about-delta-cropped.webp",
  heroRiverMotif: "/images/hero/river-motif.svg",
  workHeroPlaceholder: "/images/work/work-hero-placeholder.webp",
  bangladeshActionMap: "/images/home/bangladesh-action-map.webp",

  // â”€â”€ Programs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  programs: {
    greenCampus: "/images/programs/green-campus.jpg",
    littleGreenArtists: "/images/programs/little-green-artists.jpg",
    plasticAwareness: "/images/programs/plastic-awareness.jpg",
    cop29: "/images/programs/cop29.jpg",
    futureBangladesh: "/images/programs/future-bangladesh.jpg",
    naturesPerspective: "/images/programs/natures-perspective.jpg",
    documentaries: "/images/programs/documentaries.jpg",
    ecoPapers: "/images/programs/eco-papers.jpg",
    eidSmile: "/images/programs/eid-smile.jpg",
  },

  // â”€â”€ Documentaries â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  documentaries: {
    echoes: "/images/programs/doc-echoes.jpg",
    breathing: "/images/programs/doc-breathing.jpg",
  },

  // â”€â”€ Events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  events: {
    greenGenesis2026: "/images/events/xyz.webp",
    climateStrike2024: "/images/events/climate-strike-2024.jpg",
    littleGreenArtists: "/images/events/little-green-artists.jpg",
    plasticAwareness: "/images/events/plastic-awareness.jpg",
    eidSmile: "/images/events/eid-smile.jpg",
    placeholders: {
      wide: "/images/events/placeholders/event-placeholder-wide.webp",
      landscape: "/images/events/placeholders/event-placeholder-landscape.jpg",
      portrait: "/images/events/placeholders/event-placeholder-portrait.webp",
      square: "/images/events/placeholders/event-placeholder-square.jpeg",
      small: "/images/events/placeholders/event-placeholder-small.webp",
    },
  },

  // â”€â”€ Eco Papers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ecoPapers: {
    eco1: "/images/eco-papers/eco1.jpg",
    eco2: "/images/eco-papers/eco2.jpg",
  },

  // â”€â”€ Team â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  team: {
    rowshan: "/images/team/rowshan-akter-chowdhury.jpg",
    zakia: "/images/team/zakia-sultana.jpg",
    arnob: "/images/team/arnob.jpg",
    nihal: "/images/team/nihal.jpg",
    mridul: "/images/team/mridul.jpg",
  },

  // â”€â”€ OG / Social â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ogDefault: "/images/hero/delta-collage.webp",
} as const;
