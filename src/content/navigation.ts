// ============================================================
// YGE — Navigation Content
// ============================================================

import type { NavItem, FooterColumn } from "@/types";
import { features } from "@/content/features";

const teamLink: NavItem[] = features.teamPageLive
  ? [{ label: "Team", href: "/team" }]
  : [];

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  ...teamLink,
  { label: "Our Work", href: "/work" },
  { label: "Eco Papers", href: "/eco-papers" },
  { label: "Stories", href: "/stories" },
  { label: "Our Snapshots", href: "/snapshots" },
];

export const primaryCta: NavItem = {
  label: "Contact YGE",
  href: "/contact",
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Organization",
    links: [
      { label: "About YGE", href: "/about" },
      ...teamLink,
      { label: "Our Work", href: "/work" },
    ],
  },
  {
    heading: "Programs",
    links: [
      {
        label: "Green Genesis 2026",
        href: "/stories/green-genesis-2026-recap",
      },
      {
        label: "Little Green Artists",
        href: "/stories/little-green-artists-story",
      },
      { label: "Eco Papers", href: "/eco-papers" },
      { label: "All Programs", href: "/work" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Eco Papers", href: "/eco-papers" },
      { label: "All Resources", href: "/resources" },
      { label: "Stories", href: "/stories" },
      { label: "Our Snapshots", href: "/snapshots" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Safeguarding", href: "/safeguarding" },
    ],
  },
];
