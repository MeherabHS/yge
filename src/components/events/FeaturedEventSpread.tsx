import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { YGEEvent } from "@/types";
import {
  PaperTexture,
  TornPaperEdge,
} from "@/components/editorial/EditorialPrimitives";
import { imagePlaceholders } from "@/content/image-placeholders";

function formatFeaturedDate(event: YGEEvent) {
  const start = new Date(event.startDate ?? event.currentDate);
  const end = event.endDate ? new Date(event.endDate) : null;
  const month = start
    .toLocaleDateString("en-GB", { month: "long" })
    .toUpperCase();
  const year = start.getFullYear();
  return end
    ? `${start.getDate()}–${end.getDate()} ${month} ${year}`
    : `${start.getDate()} ${month} ${year}`;
}

export default function FeaturedEventSpread({ event }: { event: YGEEvent }) {
  const poster = event.image ?? event.coverImage;

  return (
    <section className="events-featured" aria-labelledby="featured-event-title">
      <PaperTexture />
      <TornPaperEdge position="top" />
      <div className="events-shell events-featured-grid">
        <div className="events-featured-poster">
          {poster && (
            <Image
              src={poster}
              alt="Green Genesis 2026 event poster illustrating a journey from childhood climate learning to university-level environmental leadership."
              width={1024}
              height={1536}
              priority
              placeholder="blur"
              blurDataURL={imagePlaceholders.greenGenesis}
              sizes="(max-width: 767px) 92vw, 46vw"
            />
          )}
        </div>
        <div className="events-featured-copy">
          <p className="events-featured-meta">
            Upcoming <span>•</span> {formatFeaturedDate(event)}
          </p>
          <h2 id="featured-event-title">{event.title}</h2>
          <div className="events-featured-rule" aria-hidden="true">
            <i />
          </div>
          {event.theme && (
            <div className="events-theme-block">
              <span>Theme</span>
              <p>{event.theme}</p>
            </div>
          )}
          <div className="events-featured-rule" aria-hidden="true">
            <i />
          </div>
          {event.motto && (
            <p className="events-featured-motto">{event.motto}</p>
          )}
          <p className="events-featured-location">
            <MapPin aria-hidden="true" /> {event.venue}, {event.city}
          </p>
          <Link href={`/events/${event.slug}`}>
            View event <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <TornPaperEdge />
    </section>
  );
}
