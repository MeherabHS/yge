import type { Metadata } from "next";
import ArchiveContactSheet from "@/components/events/ArchiveContactSheet";
import EventGallery from "@/components/events/EventGallery";
import EventsClosingCTA from "@/components/events/EventsClosingCTA";
import EventsHero from "@/components/events/EventsHero";
import EventsTicker from "@/components/events/EventsTicker";
import FeaturedEventSpread from "@/components/events/FeaturedEventSpread";
import {
  eventArchiveFrames,
  getPublicEventGalleryPhotos,
} from "@/content/event-gallery";
import { getEventBySlug } from "@/content/events";

export const metadata: Metadata = {
  title: "Events | Youth for a Green Earth",
  description:
    "Explore Youth for a Green Earth events, gatherings and environmental competitions in Bangladesh.",
};

export default function EventsPage() {
  const featuredEvent = getEventBySlug("green-genesis-2026");
  const galleryPhotos = getPublicEventGalleryPhotos();
  const heroPhotos = galleryPhotos
    .filter((photo) => photo.visible !== false)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4);

  return (
    <div className="events-gallery-page">
      <EventsHero photos={heroPhotos} />
      <EventsTicker />
      {featuredEvent && <FeaturedEventSpread event={featuredEvent} />}
      <EventGallery photos={galleryPhotos} />
      <ArchiveContactSheet frames={eventArchiveFrames} />
      <EventsClosingCTA nextEvent={featuredEvent} />
    </div>
  );
}
