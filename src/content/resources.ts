// ============================================================
// YGE — Resources Content
// PDF paths: undefined = no file yet → "PDF coming soon"
// ============================================================

import type { Resource } from "@/types";
import { media } from "@/content/media";

export const resources: Resource[] = [
  {
    slug: "eco-paper-01",
    title: "Eco Paper 01",
    type: "Eco Paper",
    author: "YGE Research Contributors",
    designer: "Md. Shahnoor Mridul",
    publishedDate: "2024",
    description:
      "The inaugural edition of YGE's open-access research series, presenting analysis of a pressing environmental issue affecting Bangladesh. Designed for accessibility and open distribution.",
    coverImage: media.ecoPapers.eco1,
    coverAlt: "Cover of Eco Paper 01 on sustainable agriculture practices",
    coverAspectRatio: "1 / 1",
    pdfPath: undefined, // Replace with '/pdfs/eco-paper-01.pdf' when available
    tags: ["Environment", "Bangladesh", "Research", "Open Access"],
    featured: true,
  },
  {
    slug: "eco-paper-02",
    title: "Eco Paper 02",
    type: "Eco Paper",
    author: "YGE Research Contributors",
    designer: "Md. Shahnoor Mridul",
    publishedDate: "2025",
    description:
      "The second edition of YGE's Eco Paper series. Continuing the tradition of youth-led environmental research, this edition examines another dimension of Bangladesh's environmental challenges.",
    coverImage: media.ecoPapers.eco2,
    coverAlt: "Cover of Eco Paper 02 on eco-friendly fashion",
    coverAspectRatio: "904 / 1280",
    pdfPath: undefined, // Replace with '/pdfs/eco-paper-02.pdf' when available
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
