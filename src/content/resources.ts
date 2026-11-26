// ============================================================
// YGE — Resources Content
// PDF paths: undefined = no file yet → "PDF coming soon"
// ============================================================

import type { Resource } from "@/types";
import { media } from "@/content/media";

export const resources: Resource[] = [
  {
    slug: "eco-paper-01",
    title: "Sustainable Agriculture Practices",
    type: "Eco Paper",
    author: "YGE Editorial Team",
    designer: "Md. Shahnoor Mridul",
    publishedDate: "2024",
    description:
      "How can farms keep feeding people without exhausting the land that feeds them? This paper walks through the practices behind sustainable agriculture, from permaculture, organic farming and agroecology to vertical farming, soil health, water conservation, climate-resilient crops, community-supported agriculture, integrated pest management and precision technology. It concludes that together these methods protect soil, water and biodiversity while strengthening food security and local communities.",
    coverImage: media.ecoPapers.eco1,
    coverAlt: "Cover of Eco Paper 01 on sustainable agriculture practices",
    coverAspectRatio: "1 / 1",
    pdfPath: "/pdfs/eco-paper-01-sustainable-agriculture.pdf",
    tags: ["Environment", "Bangladesh", "Research", "Open Access"],
    featured: true,
  },
  {
    slug: "eco-paper-02",
    title: "Eco-Friendly Fashion",
    type: "Eco Paper",
    author: "YGE Editorial Team",
    designer: "Md. Shahnoor Mridul",
    publishedDate: "2025",
    description:
      "Fashion is one of the world's most polluting industries, driven by fast fashion, synthetic fibres and heavy water use. This paper looks at how young people are pushing back: sharing slow-fashion and secondhand habits online, founding sustainable brands, choosing organic and next-generation materials, demanding transparency and embracing circular models like rental and repair. It also weighs the barriers of cost, greenwashing and industry resistance, and argues that youth are the agents of change who can make style and sustainability work together.",
    coverImage: media.ecoPapers.eco2,
    coverAlt: "Cover of Eco Paper 02 on eco-friendly fashion",
    coverAspectRatio: "904 / 1280",
    pdfPath: "/pdfs/eco-paper-02-eco-friendly-fashion.pdf",
    tags: ["Environment", "Bangladesh", "Research", "Open Access"],
    featured: true,
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getFeaturedResources(): Resource[] {
  return resources.filter((r) => r.featured);
}

export function getResourcesByType(type: Resource["type"]): Resource[] {
  return resources.filter((r) => r.type === type);
}
