// ============================================================
// YGE — Impact Metrics & Locations
// source: 'verified' | 'demo' | 'awaiting-confirmation'
// Figures shown are based on publicly documented YGE activities
// and will be updated as verified reporting becomes available.
// ============================================================

import type { ImpactMetric, ImpactLocation } from '@/types';

export const impactMetrics: ImpactMetric[] = [
  {
    id: 'founded',
    label: 'Year Founded',
    value: 2024,
    description: 'Youth for a Green Earth was established in 2024.',
    source: 'verified',
  },
  {
    id: 'children-engaged',
    label: 'Children Engaged',
    value: 55,
    description: 'Children from Classes 1–5 engaged through Little Green Artists at Nakhalpara Hossain Ali High School.',
    source: 'verified',
    programSlug: 'little-green-artists',
  },
  {
    id: 'locations',
    label: 'Documented Locations',
    value: 3,
    description: 'Locations documented under Plastic Awareness 1.0: Dhaka, Sreemangal and Khagrachari.',
    source: 'verified',
    programSlug: 'plastic-awareness-1',
  },
  {
    id: 'eco-papers',
    label: 'Eco Papers Published',
    value: 2,
    description: 'Environmental research publications produced by YGE contributors.',
    source: 'verified',
    programSlug: 'eco-papers',
  },
  {
    id: 'documentaries',
    label: 'Documentary Titles',
    value: 3,
    description: 'Environmental film and documentary titles produced or associated with YGE.',
    source: 'verified',
    programSlug: 'environmental-documentaries',
  },
  {
    id: 'genesis-segments',
    label: 'Green Genesis Segments',
    value: 12,
    description: 'Competitive segments across Green Genesis 2026.',
    source: 'verified',
    programSlug: 'green-genesis-2026',
  },
  {
    id: 'prize-pool',
    label: 'Prize Pool (BDT)',
    value: 183000,
    unit: '৳',
    description: 'Publicly announced total prize pool for Green Genesis 2026.',
    source: 'verified',
    programSlug: 'green-genesis-2026',
  },
  {
    id: 'programs',
    label: 'Programs Run',
    value: 9,
    description: 'Environmental programs and initiatives delivered since founding.',
    source: 'demo',
  },
  {
    id: 'volunteers',
    label: 'Volunteers Involved',
    value: 40,
    description: 'Approximate number of youth volunteers who have contributed to YGE activities.',
    source: 'demo',
  },
];

export const impactLocations: ImpactLocation[] = [
  {
    id: 'dhaka',
    name: 'Dhaka',
    region: 'Dhaka Division',
    lat: 23.8103,
    lng: 90.4125,
    activities: ['Little Green Artists', 'Plastic Awareness 1.0', 'Climate Strike', 'Eid Smile 2025'],
  },
  {
    id: 'sreemangal',
    name: 'Sreemangal',
    region: 'Sylhet Division',
    lat: 24.3095,
    lng: 91.7343,
    activities: ['Plastic Awareness 1.0'],
  },
  {
    id: 'khagrachari',
    name: 'Khagrachari',
    region: 'Chittagong Hill Tracts',
    lat: 23.1193,
    lng: 91.9847,
    activities: ['Plastic Awareness 1.0'],
  },
];

export function getVerifiedMetrics(): ImpactMetric[] {
  return impactMetrics.filter((m) => m.source === 'verified');
}
