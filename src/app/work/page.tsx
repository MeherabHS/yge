import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { getFeaturedEvent } from "@/content/events";
import { programs } from "@/content/programs";
import { siteConfig } from "@/content/site";
import WorkArchivePage from "@/components/work/WorkArchivePage";
import WorkHero from "@/components/work/WorkHero";
import FeaturedEvent from "@/components/work/FeaturedEvent";
import PillarLinks from "@/components/work/PillarLinks";
import WorkClosingCTA from "@/components/work/WorkClosingCTA";
import { serializeTrustedJsonLd } from "@/lib/security/json-ld";

export const metadata: Metadata = {
  title: "Our Work — Youth Climate Programs in Bangladesh",
  description:
    "Explore Youth for a Green Earth programs across climate education, advocacy, campus action, community engagement, publications and creative media.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work — Youth for a Green Earth",
    description:
      "A searchable archive of YGE youth climate programs and the featured Green Genesis 2026 event.",
    url: "/work",
    images: [
      {
        url: "/images/events/xyz.webp",
        alt: "Green Genesis 2026 event poster",
      },
    ],
  },
};

export default async function WorkPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const featuredEvent = getFeaturedEvent();
  if (!featuredEvent) return null;
  const eventImage = featuredEvent.image ?? featuredEvent.coverImage;
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: featuredEvent.title,
    description: featuredEvent.theme ?? featuredEvent.description,
    startDate: featuredEvent.startDate ?? featuredEvent.currentDate,
    endDate: featuredEvent.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: new URL(eventImage, siteConfig.url).toString(),
    location: {
      "@type": "Place",
      name: featuredEvent.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: featuredEvent.city,
        addressCountry: featuredEvent.country ?? "Bangladesh",
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: new URL(`/events/${featuredEvent.slug}`, siteConfig.url).toString(),
  };

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        // This sink contains repository-owned structured data and escapes tag starts.
        dangerouslySetInnerHTML={{
          __html: serializeTrustedJsonLd(eventJsonLd),
        }}
      />
      <div className="work-page">
        <WorkHero />
        <FeaturedEvent event={featuredEvent} />
        <Suspense
          fallback={
            <div
              className="work-archive-fallback"
              aria-label="Loading program archive"
            >
              <span>Loading program archive</span>
            </div>
          }
        >
          <WorkArchivePage programs={programs} />
        </Suspense>
        <PillarLinks />
        <WorkClosingCTA />
      </div>
    </>
  );
}
