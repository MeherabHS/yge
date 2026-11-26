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
    title: "Sustainable Agriculture Practices",
    subtitle:
      "Enhancing food security and environmental stewardship through eco-friendly farming techniques",
    summary:
      "How can farms keep feeding people without exhausting the land that feeds them? This paper walks through the practices behind sustainable agriculture, from permaculture, organic farming and agroecology to vertical farming, soil health, water conservation, climate-resilient crops, community-supported agriculture, integrated pest management and precision technology. It concludes that together these methods protect soil, water and biodiversity while strengthening food security and local communities.",
    publicationDate: "2024",
    category: "Environmental Research",
    documentUrl: "/pdfs/eco-paper-01-sustainable-agriculture.pdf",
    authors: ["YGE Editorial Team"],
    topics: [
      "Permaculture",
      "Organic farming",
      "Agroecology",
      "Vertical farming",
      "Soil health",
      "Water conservation",
      "Climate-resilient crops",
      "Integrated pest management",
    ],
    featured: true,
    requiresVerification: false,
    seriesName: "YGE Eco Paper Series",
    author: "YGE Editorial Team",
    designer: "Shakir Hossain",
    publishedAt: null,
    year: 2024,
    excerpt: null,
    coverImage: media.ecoPapers.eco1,
    coverAlt: "Cover of Eco Paper 01 on sustainable agriculture practices",
    coverAspectRatio: "1 / 1",
    pdfUrl: "/pdfs/eco-paper-01-sustainable-agriculture.pdf",
    status: "available",
  },
  {
    id: "eco-paper-02",
    slug: "eco-paper-02",
    issueNumber: "02",
    title: "Eco-Friendly Fashion",
    subtitle: "Can youth revive sustainable clothing practices?",
    summary:
      "Fashion is one of the world's most polluting industries, driven by fast fashion, synthetic fibres and heavy water use. This paper looks at how young people are pushing back: sharing slow-fashion and secondhand habits online, founding sustainable brands, choosing organic and next-generation materials, demanding transparency and embracing circular models like rental and repair. It also weighs the barriers of cost, greenwashing and industry resistance, and argues that youth are the agents of change who can make style and sustainability work together.",
    publicationDate: "2025",
    category: "Environmental Research",
    documentUrl: "/pdfs/eco-paper-02-eco-friendly-fashion.pdf",
    authors: ["YGE Editorial Team"],
    topics: [
      "Fast fashion",
      "Secondhand and upcycling",
      "Sustainable materials",
      "Transparency",
      "Circular fashion",
      "Greenwashing",
    ],
    featured: true,
    requiresVerification: false,
    seriesName: "YGE Eco Paper Series",
    author: "YGE Editorial Team",
    designer: "N.M.H Patwary Arnob",
    publishedAt: null,
    year: 2025,
    excerpt: null,
    coverImage: media.ecoPapers.eco2,
    coverAlt: "Cover of Eco Paper 02 on eco-friendly fashion",
    coverAspectRatio: "904 / 1280",
    pdfUrl: "/pdfs/eco-paper-02-eco-friendly-fashion.pdf",
    status: "available",
  },
];

export function getEcoPaperBySlug(slug: string): EcoPaper | undefined {
  return ecoPapers.find((p) => p.slug === slug);
}

export function getFeaturedEcoPapers(): EcoPaper[] {
  return ecoPapers.filter((p) => p.featured);
}
