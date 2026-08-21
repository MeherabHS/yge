import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { programs } from "@/content/programs";
import { events } from "@/content/events";
import { stories } from "@/content/stories";
import { resources } from "@/content/resources";
import { ecoPapers } from "@/content/eco-papers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/about",
    "/work",
    "/impact",
    "/eco-papers",
    "/stories",
    "/events",
    "/resources",
    "/team",
    "/contact",
    "/privacy",
    "/safeguarding",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const programRoutes = programs.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const ecoPaperRoutes = ecoPapers.map((p) => ({
    url: `${baseUrl}/eco-papers/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: e.featured ? 0.9 : 0.6,
  }));

  const storyRoutes = stories.map((s) => ({
    url: `${baseUrl}/stories/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const resourceRoutes = resources.map((r) => ({
    url: `${baseUrl}/resources/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...programRoutes,
    ...ecoPaperRoutes,
    ...eventRoutes,
    ...storyRoutes,
    ...resourceRoutes,
  ];
}
