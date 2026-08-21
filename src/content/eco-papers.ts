// ============================================================
// YGE — Eco Papers Content
// First-class publication series. Unknown fields remain null.
// ============================================================

import type { EcoPaper } from "@/types";
import { media } from "@/content/media";

export const ecoPapers: EcoPaper[] = [
  {
    id: "eco-paper-01",
    slug: "eco-paper-01",
    issueNumber: "01",
    title: "Eco Paper 01",
    subtitle: "Youth environmental research and action series",
    summary:
      "A forthcoming issue in YGE's youth environmental publication series. Full subject details will be added after editorial verification.",
    publicationDate: null,
    category: "Environmental Research",
    documentUrl: null,
    authors: ["K. M. Mahbub Rahman"],
    topics: [],
    featured: true,
    requiresVerification: false,
    seriesName: "YGE Eco Paper Series",
    author: "K. M. Mahbub Rahman",
    designer: "Shakir Hossain",
    publishedAt: null,
    year: 2024,
    excerpt: null,
    coverImage: media.ecoPapers.eco1,
    coverAlt: "Cover of Eco Paper 01 on sustainable agriculture practices",
    coverAspectRatio: "1 / 1",
    pdfUrl: null, // PDF coming soon
    status: "coming-soon",
  },
  {
    id: "eco-paper-02",
    slug: "eco-paper-02",
    issueNumber: "02",
    title: "Eco Paper 02",
    subtitle: "Youth environmental research and action series",
    summary:
      "A forthcoming issue in YGE's youth environmental publication series. Full subject details will be added after editorial verification.",
    publicationDate: null,
    category: "Environmental Research",
    documentUrl: null,
    authors: ["K. M. Mahbub Rahman"],
    topics: [],
    featured: true,
    requiresVerification: false,
    seriesName: "YGE Eco Paper Series",
    author: "K. M. Mahbub Rahman",
    designer: "Arnob Patwary",
    publishedAt: null,
    year: 2025,
    excerpt: null,
    coverImage: media.ecoPapers.eco2,
    coverAlt: "Cover of Eco Paper 02 on eco-friendly fashion",
    coverAspectRatio: "904 / 1280",
    pdfUrl: null, // PDF coming soon
    status: "coming-soon",
  },
];

export function getEcoPaperBySlug(slug: string): EcoPaper | undefined {
  return ecoPapers.find((p) => p.slug === slug);
}

export function getFeaturedEcoPapers(): EcoPaper[] {
  return ecoPapers.filter((p) => p.featured);
}
