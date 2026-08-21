// ============================================================
// YGE — Site Configuration
// Update this file to change org info, social links, CTAs.
// ============================================================

import type { SiteConfig } from "@/types";

export interface ContactConfig {
  email: string;
  formMode: "api" | "mailto" | "demo";
  endpoint?: string;
  inquiryTopics: string[];
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const contactConfig: ContactConfig = {
  email: "youthforagreenearth@gmail.com",
  formMode: "api",
  endpoint: "/api/contact",
  inquiryTopics: [
    "General",
    "Collaboration",
    "Events",
    "Media",
    "Volunteering",
  ],
  socialLinks: {
    facebook: "https://www.facebook.com/youthforagreenearth/",
    linkedin: "https://www.linkedin.com/company/youth-for-a-green-earth/",
    instagram:
      "https://www.instagram.com/youthforagreenearth?igsh=MW45ZW1rbTUwN3Q5OQ==",
  },
};

export const siteConfig: SiteConfig = {
  name: "Youth for a Green Earth",
  shortName: "YGE",
  motto: "Transforming Awareness into Action",
  description:
    "Youth for a Green Earth equips young people across Bangladesh to understand environmental challenges, raise their voices and turn climate awareness into practical action.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://youthforagreenearth.org",
  email: contactConfig.email,
  social: {
    facebook: "https://www.facebook.com/youthforagreenearth/",
    instagram:
      "https://www.instagram.com/youthforagreenearth?igsh=MW45ZW1rbTUwN3Q5OQ==",
    linkedin: "https://www.linkedin.com/company/youth-for-a-green-earth/",
  },
  ctas: {
    primary: { label: "Explore Our Impact", href: "/impact" },
    secondary: { label: "Contact YGE", href: "/contact" },
    join: { label: "Contact YGE", href: "/contact" },
  },
  demoMode: false,
  formMode: contactConfig.formMode,
  // ── To update the featured event shown site-wide, change this slug. ──
  featuredEventSlug: "green-genesis-2026",
  defaultMeta: {
    title: "Youth for a Green Earth — Transforming Awareness into Action",
    description:
      "A youth-led environmental organization in Bangladesh working through climate education, advocacy, creative expression and community action.",
    ogImage: "/images/hero/delta-collage.webp",
  },
};
