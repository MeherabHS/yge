"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { YGEEvent } from "@/types";
import { formatEventDate } from "@/content/events";
import {
  HalftonePattern,
  PaperTexture,
  TapeStrip,
} from "@/components/editorial/EditorialPrimitives";
import { imagePlaceholders } from "@/content/image-placeholders";

const posterAlt =
  "Green Genesis 2026 event poster illustrating a journey from childhood climate learning to university-level environmental leadership.";

export default function FeaturedEvent({ event }: { event: YGEEvent }) {
  const image = event.image ?? event.coverImage;
  return (
    <section className="work-featured" aria-labelledby="featured-event-title">
      <HalftonePattern />
      <div className="work-shell">
        <p className="work-featured-label">
          Featured event <span aria-hidden="true">·</span> 2026
        </p>
        <div className="work-featured-grid">
          <motion.div
            className="featured-poster-frame"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <PaperTexture />
            <TapeStrip />
            <div className="featured-poster-image">
              <Image
                src={image}
                alt={posterAlt}
                width={1003}
                height={1568}
                sizes="(max-width: 780px) 92vw, (max-width: 1200px) 44vw, 620px"
                priority
                placeholder="blur"
                blurDataURL={imagePlaceholders.greenGenesis}
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>
          <motion.article
            className="featured-event-copy"
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="event-status">{event.status}</span>
            <h2 id="featured-event-title">{event.title}</h2>
            <p className="featured-event-theme">{event.theme}</p>
            <p className="featured-event-motto">{event.motto}</p>
            <dl className="featured-event-meta">
              <div>
                <dt>
                  <CalendarDays aria-hidden="true" /> Date
                </dt>
                <dd>{formatEventDate(event)}</dd>
              </div>
              <div>
                <dt>
                  <MapPin aria-hidden="true" /> Venue
                </dt>
                <dd>
                  {event.venue}, {event.city}
                </dd>
              </div>
            </dl>
            <div className="featured-event-actions">
              <Link href={`/events/${event.slug}`} className="lime-button">
                View event details <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/events" className="paper-link">
                Explore all events <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
