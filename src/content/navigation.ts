// ============================================================
// YGE — Navigation Content
// ============================================================

import type { NavItem, FooterColumn } from '@/types';

export const primaryNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Our Work', href: '/work' },
  { label: 'Eco Papers', href: '/eco-papers' },
  { label: 'Stories', href: '/stories' },
  { label: 'Events', href: '/events' },
];

export const primaryCta: NavItem = {
  label: 'Contact YGE',
  href: '/contact',
};

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Organization',
    links: [
      { label: 'About YGE', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Our Work', href: '/work' },
      { label: 'Impact', href: '/impact' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Project Green Campus', href: '/work/project-green-campus' },
      { label: 'Little Green Artists', href: '/work/little-green-artists' },
      { label: 'Eco Papers', href: '/eco-papers' },
      { label: 'Documentaries', href: '/work/environmental-documentaries' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Eco Papers', href: '/eco-papers' },
      { label: 'All Resources', href: '/resources' },
      { label: 'Stories', href: '/stories' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Safeguarding', href: '/safeguarding' },
    ],
  },
];
