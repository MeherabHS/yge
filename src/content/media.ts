// ============================================================
// YGE — Media / Image Paths
// To replace any image: change the path here.
// All image references in the UI pull from this file.
// ============================================================

export const media = {
  // Official organization mark. The JPG is the preserved source; the WebP is
  // a whitespace-trimmed, transparent presentation derivative for dark UI.
  brand: {
    officialLogo: '/images/brand/yge-official-logo.webp',
    officialLogoSource: '/images/brand/yge-official-logo.jpg',
  },

  // ── Hero ────────────────────────────────────────────────
  heroCollage: '/images/hero/hero-collage.jpg',
  heroDeltaCollage: '/images/hero/delta-collage.webp',
  aboutDeltaCollage: '/images/hero/about-delta-collage.webp',
  aboutDeltaCropped: '/images/hero/about-delta-cropped.webp',
  heroRiverMotif: '/images/hero/river-motif.svg',
  workHeroPlaceholder: '/images/work/work-hero-placeholder.webp',
  bangladeshActionMap: '/images/home/bangladesh-action-map.webp',

  // ── Programs ─────────────────────────────────────────────
  programs: {
    greenCampus: '/images/programs/green-campus.jpg',
    littleGreenArtists: '/images/programs/little-green-artists.jpg',
    plasticAwareness: '/images/programs/plastic-awareness.jpg',
    cop29: '/images/programs/cop29.jpg',
    futureBangladesh: '/images/programs/future-bangladesh.jpg',
    naturesPerspective: '/images/programs/natures-perspective.jpg',
    documentaries: '/images/programs/documentaries.jpg',
    ecoPapers: '/images/programs/eco-papers.jpg',
    eidSmile: '/images/programs/eid-smile.jpg',
  },

  // ── Documentaries ────────────────────────────────────────
  documentaries: {
    buriganga: '/images/programs/doc-buriganga.jpg',
    echoes: '/images/programs/doc-echoes.jpg',
    breathing: '/images/programs/doc-breathing.jpg',
  },

  // ── Events ───────────────────────────────────────────────
  events: {
    greenGenesis2026: '/images/events/xyz.webp',
    climateStrike2024: '/images/events/climate-strike-2024.jpg',
    littleGreenArtists: '/images/events/little-green-artists.jpg',
    plasticAwareness: '/images/events/plastic-awareness.jpg',
    eidSmile: '/images/events/eid-smile.jpg',
    placeholders: {
      wide: '/images/events/placeholders/event-placeholder-wide.webp',
      landscape: '/images/events/placeholders/event-placeholder-landscape.jpg',
      portrait: '/images/events/placeholders/event-placeholder-portrait.webp',
      square: '/images/events/placeholders/event-placeholder-square.jpeg',
      small: '/images/events/placeholders/event-placeholder-small.webp',
    },
  },

  // ── Stories ──────────────────────────────────────────────
  stories: {
    masthead: '/images/stories/stories-masthead.webp',
    mastheadMobile: '/images/stories/stories-masthead-mobile.webp',
    littleGreenArtistsHero: '/images/stories/little-green-artists-hero.jpg',
    burigangaHero: '/images/stories/buriganga-hero.jpg',
    plasticAwarenessHero: '/images/stories/plastic-awareness-hero.jpg',
    greenGenesisHero: '/images/stories/green-genesis-hero.jpg',
  },

  // ── Eco Papers ───────────────────────────────────────────
  ecoPapers: {
    eco1: '/images/eco-papers/eco1.jpg',
    eco2: '/images/eco-papers/eco2.jpg',
  },

  // ── Team ─────────────────────────────────────────────────
  team: {
    rowshan: '/images/team/rowshan-akter-chowdhury.jpg',
    zakia: '/images/team/zakia-sultana.jpg',
    arnob: '/images/team/arnob.jpg',
    nihal: '/images/team/nihal.jpg',
    mridul: '/images/team/mridul.jpg',
  },

  // ── OG / Social ──────────────────────────────────────────
  ogDefault: '/images/og-default.jpg',
} as const;
