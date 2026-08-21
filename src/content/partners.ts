// ============================================================
// YGE — Partners & Collaborators
// Partner names and logo use require final organizational
// verification. Logos are text wordmarks until approved.
// ============================================================

import type { Partner } from "@/types";

export const partners: Partner[] = [
  {
    slug: "brac-university-outreach",
    name: "BRAC University Outreach Team",
    shortName: "BU Outreach",
    relationship: "Organizer",
    url: "https://bracu.ac.bd",
    description: "Co-organizer of Green Genesis 2026",
    requiresVerification: true,
  },
  {
    slug: "c3er-brac",
    name: "C3ER, BRAC University",
    shortName: "C3ER",
    relationship: "Collaborator",
    url: "https://bracu.ac.bd",
    description: "Centre for Climate Change and Environmental Research",
    requiresVerification: true,
  },
  {
    slug: "bafsk",
    name: "BAFSK Climate and Environmental Action Network",
    shortName: "BAFSK",
    relationship: "Collaborator",
    description: "Environmental action network partner",
    requiresVerification: true,
  },
  {
    slug: "emk-center",
    name: "EMK Center",
    shortName: "EMK Center",
    relationship: "Venue",
    url: "https://emkcenter.org",
    description: "Venue partner for YGE events",
    requiresVerification: true,
  },
  {
    slug: "kazi-enterprise",
    name: "Kazi Enterprise",
    shortName: "Kazi Enterprise",
    relationship: "Supporter",
    description: "Supporter of Little Green Artists program",
    requiresVerification: true,
  },
  {
    slug: "kaisar-foundation",
    name: "Kaisar Foundation",
    shortName: "Kaisar Foundation",
    relationship: "Supporter",
    description: "Supporter of Little Green Artists program",
    requiresVerification: true,
  },
];

export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find((p) => p.slug === slug);
}

export function getPartnersByRelationship(
  rel: Partner["relationship"],
): Partner[] {
  return partners.filter((p) => p.relationship === rel);
}
