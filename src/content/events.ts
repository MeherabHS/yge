// ============================================================
// YGE — Events Content
// ──────────────────────────────────────────────────────────
// HOW TO UPDATE GREEN GENESIS DATE:
//   1. Find the entry with slug "green-genesis-2026"
//   2. Change currentDate and/or endDate
//   3. Update rescheduleNotice if applicable
//   That's it — the date propagates everywhere automatically.
// ============================================================

import type { YGEEvent } from "@/types";
import { media } from "@/content/media";

export const events: YGEEvent[] = [
  {
    slug: "green-genesis-2026",
    recapStorySlug: "green-genesis-2026-recap",
    title: "Green Genesis 2026",
    shortTitle: "Green Genesis",
    tagline: "Empowering the next generation of environmental leaders.",
    theme: "Awakening Climate Consciousness from Childhood to Campus",
    motto: "Empowering the next generation of environmental leaders.",
    status: "past",
    originalDate: "2026-07-17",
    startDate: "2026-09-08",
    currentDate: "2026-09-08",
    endDate: "2026-09-11",
    venue: "BRAC University",
    city: "Dhaka",
    country: "Bangladesh",
    eligibility:
      "Junior: Class VI–VIII · Secondary: Class IX–X · Higher Secondary: Class XI–XII · Tertiary: University undergraduate and graduate",
    registrationStatus: "closed",
    registrationUrl: "https://greengenesis2026.com/",
    entryFee: "Varies by segment — see event details",
    prizePool: "BDT 1,83,000",
    segments: [
      {
        name: "Environmental Project Display",
        description:
          "Present innovative environmental solutions and sustainability-focused projects before judges and visitors.",
        prize: "BDT 50,000",
      },
      {
        name: "Climate Science Olympiad",
        description:
          "Test your knowledge of climate science, Earth systems, environmental issues, and global sustainability challenges.",
        prize: "BDT 13,500",
      },
      {
        name: "Eco Decode: Problem-Solving Challenge",
        description:
          "Collaborate with your team to develop practical solutions to real-world environmental problems.",
        prize: "BDT 20,000",
      },
      {
        name: "Climate Essay / Opinion Writing",
        description:
          "Express your thoughts on pressing environmental issues through analytical and persuasive writing.",
        prize: "Crest + certificate from BRAC",
      },
      {
        name: "Green Journalism",
        description:
          "Investigate, document and report environmental stories that deserve attention and action.",
        prize: "Crest + certificate from BRAC",
      },
      {
        name: "AI Art: Climate Futures",
        description:
          "Use artificial intelligence to visualize future climate realities and environmental challenges.",
        prize: "Crest + certificate from BRAC",
      },
      {
        name: "Environmental Reel",
        description:
          "Create impactful short-form video content that inspires environmental awareness and climate action.",
        prize: "BDT 30,000",
      },
      {
        name: "Nature & Climate Photography",
        description:
          "Capture powerful stories of nature, biodiversity, climate change, and environmental conservation through your lens.",
        prize: "BDT 40,000",
      },
      {
        name: "Poster Design",
        description:
          "Transform ideas into compelling visual campaigns that advocate for climate awareness and sustainability.",
        prize: "Crest + certificate from BRAC",
      },
      {
        name: "Wall Magazine Exhibition",
        description:
          "Combine creativity, research, design, and storytelling in a large-scale environmental publication.",
        prize: "BDT 20,000",
      },
      {
        name: "Climate Oratory",
        description:
          "Take the stage and deliver powerful speeches that inspire environmental responsibility and action.",
        prize: "Crest + certificate from BRAC",
      },
      {
        name: "A Letter to Nature",
        description:
          "Express your connection with nature through heartfelt and meaningful writing.",
        prize: "Crest + certificate from BRAC",
      },
    ],
    organizers: [
      "Youth for a Green Earth",
      "BRACU C3ER",
      "BRAC University Outreach Team",
      "BRAC University Environment Club",
    ],
    contactEmail: "youthforagreenearth@gmail.com",
    externalUrl: "https://greengenesis2026.com/",
    image: media.events.greenGenesis2026,
    coverImage: media.events.greenGenesis2026,
    description:
      "Green Genesis is YGE's flagship annual competition — twelve segments bringing together young Bangladeshis to think, create, debate and lead on environmental issues. With a total prize pool of BDT 1,83,000, Green Genesis 2026 is the largest youth climate competition YGE has organized.",
    featured: true,
  },
  {
    slug: "global-climate-strike-2024",
    title: "Global Climate Strike — Bangladesh",
    shortTitle: "Climate Strike 2024",
    tagline: "Standing together for our planet",
    status: "past",
    currentDate: "2024-09-27",
    venue: "Dhaka",
    city: "Dhaka",
    eligibility: "Open to all",
    registrationStatus: "not-required",
    organizers: ["Youth for a Green Earth"],
    contactEmail: "youthforagreenearth@gmail.com",
    coverImage: "/images/events/climate-strike-2024.jpg",
    description:
      "YGE joined the global climate strike movement, mobilizing young people across Dhaka to demand urgent climate action ahead of COP29.",
    featured: false,
  },
  {
    slug: "little-green-artists-2025",
    title: "Little Green Artists: An Art Journey to Nature",
    shortTitle: "Little Green Artists",
    tagline: "Art, nature and the 3Rs — for the next generation",
    status: "past",
    currentDate: "2025-02-17",
    venue: "Nakhalpara Hossain Ali High School",
    city: "Dhaka",
    eligibility: "Students of Classes 1–5",
    registrationStatus: "not-required",
    organizers: ["Youth for a Green Earth"],
    contactEmail: "youthforagreenearth@gmail.com",
    image: "/images/stories/lga-photo-saplings.jpg",
    coverImage: "/images/events/little-green-artists.jpg",
    description:
      "55 children from Classes 1–5 participated in an art competition and recycling workshop, learning about the 3Rs and receiving sapling distributions. Supported by Kazi Enterprise and Kaisar Foundation.",
    featured: false,
  },
  {
    slug: "plastic-awareness-1",
    title: "Plastic Awareness 1.0",
    shortTitle: "Plastic Awareness 1.0",
    tagline: "Community action against plastic pollution",
    status: "past",
    currentDate: "2025-01-01", // approximate — update when confirmed
    venue: "Multiple locations",
    city: "Dhaka, Sreemangal, Khagrachari",
    eligibility: "Open community participation",
    registrationStatus: "not-required",
    organizers: ["Youth for a Green Earth"],
    contactEmail: "youthforagreenearth@gmail.com",
    coverImage: "/images/events/plastic-awareness.jpg",
    description:
      "A community plastic-awareness campaign documented across three locations — Dhaka, Sreemangal and Khagrachari.",
    featured: false,
  },
  {
    slug: "eid-smile-2025",
    title: "Eid Smile 2025",
    shortTitle: "Eid Smile 2025",
    tagline: "Sharing joy, sharing responsibility",
    status: "past",
    currentDate: "2025-04-01", // approximate
    venue: "Dhaka",
    city: "Dhaka",
    eligibility: "Open",
    registrationStatus: "not-required",
    organizers: ["Youth for a Green Earth"],
    contactEmail: "youthforagreenearth@gmail.com",
    coverImage: "/images/events/eid-smile.jpg",
    description:
      "A community wellbeing initiative combining celebration with environmental awareness during Eid season.",
    featured: false,
  },
];

export function getEventBySlug(slug: string): YGEEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvent(): YGEEvent | undefined {
  return events.find((e) => e.featured);
}

export function getUpcomingEvents(): YGEEvent[] {
  return events.filter(
    (e) => e.status === "upcoming" || e.status === "rescheduled",
  );
}

export function getPastEvents(): YGEEvent[] {
  return events.filter((e) => e.status === "past");
}

export function getOngoingEvents(): YGEEvent[] {
  return events.filter((e) => e.status === "ongoing");
}

// Format date range for display
export function formatEventDate(event: YGEEvent): string {
  const start = new Date(event.startDate ?? event.currentDate);
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  if (!event.endDate) return start.toLocaleDateString("en-GB", opts);
  const end = new Date(event.endDate);
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.getDate()}–${end.toLocaleDateString("en-GB", opts)}`;
  }
  return `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", opts)}`;
}
