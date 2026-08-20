// ============================================================
// YGE — Events Content
// ──────────────────────────────────────────────────────────
// HOW TO UPDATE GREEN GENESIS DATE:
//   1. Find the entry with slug "green-genesis-2026"
//   2. Change currentDate and/or endDate
//   3. Update rescheduleNotice if applicable
//   That's it — the date propagates everywhere automatically.
// ============================================================

import type { YGEEvent } from '@/types';
import { media } from '@/content/media';

export const events: YGEEvent[] = [
  {
    slug: 'green-genesis-2026',
    title: 'Green Genesis 2026',
    shortTitle: 'Green Genesis',
    tagline: 'Empowering the next generation of environmental leaders.',
    theme: 'Awakening Climate Consciousness from Childhood to Campus',
    motto: 'Empowering the next generation of environmental leaders.',
    status: 'upcoming',
    originalDate: '2026-07-04',
    startDate: '2026-09-10',
    currentDate: '2026-09-10',
    endDate: '2026-09-11',
    rescheduleNotice:
      'Green Genesis 2026 has been rescheduled to 10–11 September 2026 at BRAC University.',
    venue: 'BRAC University',
    city: 'Dhaka',
    country: 'Bangladesh',
    eligibility: 'Open to university and college students across Bangladesh',
    registrationStatus: 'coming-soon',
    registrationUrl: undefined,
    entryFee: 'Varies by segment — see event details',
    prizePool: 'BDT 1,83,000',
    segments: [
      { name: 'Environmental Debate', description: 'Competitive debate on climate policy', prize: 'BDT 15,000' },
      { name: 'Climate Photography', description: 'Documentary photography of environmental issues', prize: 'BDT 12,000' },
      { name: 'Eco Film', description: 'Short film competition on environmental themes', prize: 'BDT 18,000' },
      { name: 'Green Startup Pitch', description: 'Pitching sustainable business ideas', prize: 'BDT 25,000' },
      { name: 'Research Paper Presentation', description: 'Academic research on environment', prize: 'BDT 15,000' },
      { name: 'Poster Design', description: 'Climate campaign poster competition', prize: 'BDT 10,000' },
      { name: 'Climate Quiz', description: 'General knowledge on climate science', prize: 'BDT 12,000' },
      { name: 'Recitation', description: 'Environmental poem recitation', prize: 'BDT 8,000' },
      { name: 'Essay Writing', description: 'Written essay on climate justice', prize: 'BDT 10,000' },
      { name: 'Art Competition', description: 'Visual art inspired by nature and climate', prize: 'BDT 12,000' },
      { name: 'Science Olympiad', description: 'Environmental science challenges', prize: 'BDT 28,000' },
      { name: 'Climate Leadership Panel', description: 'Youth leadership discussion', prize: 'BDT 18,000' },
    ],
    organizers: ['Youth for a Green Earth', 'BRAC University Outreach Team'],
    contactEmail: 'youthforagreenearth@gmail.com',
    externalUrl: undefined,
    image: media.events.greenGenesis2026,
    coverImage: media.events.greenGenesis2026,
    description:
      'Green Genesis is YGE\'s flagship annual competition — twelve segments bringing together young Bangladeshis to think, create, debate and lead on environmental issues. With a total prize pool of BDT 1,83,000, Green Genesis 2026 is the largest youth climate competition YGE has organized.',
    featured: true,
  },
  {
    slug: 'global-climate-strike-2024',
    title: 'Global Climate Strike — Bangladesh',
    shortTitle: 'Climate Strike 2024',
    tagline: 'Standing together for our planet',
    status: 'past',
    currentDate: '2024-09-27',
    venue: 'Dhaka',
    city: 'Dhaka',
    eligibility: 'Open to all',
    registrationStatus: 'not-required',
    organizers: ['Youth for a Green Earth'],
    contactEmail: 'youthforagreenearth@gmail.com',
    coverImage: '/images/events/climate-strike-2024.jpg',
    description:
      'YGE joined the global climate strike movement, mobilizing young people across Dhaka to demand urgent climate action ahead of COP29.',
    featured: false,
  },
  {
    slug: 'little-green-artists-2025',
    title: 'Little Green Artists: An Art Journey to Nature',
    shortTitle: 'Little Green Artists',
    tagline: 'Art, nature and the 3Rs — for the next generation',
    status: 'past',
    currentDate: '2025-02-17',
    venue: 'Nakhalpara Hossain Ali High School',
    city: 'Dhaka',
    eligibility: 'Students of Classes 1–5',
    registrationStatus: 'not-required',
    organizers: ['Youth for a Green Earth'],
    contactEmail: 'youthforagreenearth@gmail.com',
    coverImage: '/images/events/little-green-artists.jpg',
    description:
      '55 children from Classes 1–5 participated in an art competition and recycling workshop, learning about the 3Rs and receiving sapling distributions. Supported by Kazi Enterprise and Kaisar Foundation.',
    featured: false,
  },
  {
    slug: 'plastic-awareness-1',
    title: 'Plastic Awareness 1.0',
    shortTitle: 'Plastic Awareness 1.0',
    tagline: 'Community action against plastic pollution',
    status: 'past',
    currentDate: '2025-01-01', // approximate — update when confirmed
    venue: 'Multiple locations',
    city: 'Dhaka, Sreemangal, Khagrachari',
    eligibility: 'Open community participation',
    registrationStatus: 'not-required',
    organizers: ['Youth for a Green Earth'],
    contactEmail: 'youthforagreenearth@gmail.com',
    coverImage: '/images/events/plastic-awareness.jpg',
    description:
      'A community plastic-awareness campaign documented across three locations — Dhaka, Sreemangal and Khagrachari.',
    featured: false,
  },
  {
    slug: 'eid-smile-2025',
    title: 'Eid Smile 2025',
    shortTitle: 'Eid Smile 2025',
    tagline: 'Sharing joy, sharing responsibility',
    status: 'past',
    currentDate: '2025-04-01', // approximate
    venue: 'Dhaka',
    city: 'Dhaka',
    eligibility: 'Open',
    registrationStatus: 'not-required',
    organizers: ['Youth for a Green Earth'],
    contactEmail: 'youthforagreenearth@gmail.com',
    coverImage: '/images/events/eid-smile.jpg',
    description:
      'A community wellbeing initiative combining celebration with environmental awareness during Eid season.',
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
  return events.filter((e) => e.status === 'upcoming' || e.status === 'rescheduled');
}

export function getPastEvents(): YGEEvent[] {
  return events.filter((e) => e.status === 'past');
}

export function getOngoingEvents(): YGEEvent[] {
  return events.filter((e) => e.status === 'ongoing');
}

// Format date range for display
export function formatEventDate(event: YGEEvent): string {
  const start = new Date(event.startDate ?? event.currentDate);
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  if (!event.endDate) return start.toLocaleDateString('en-GB', opts);
  const end = new Date(event.endDate);
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${end.toLocaleDateString('en-GB', opts)}`;
  }
  return `${start.toLocaleDateString('en-GB', opts)} – ${end.toLocaleDateString('en-GB', opts)}`;
}
