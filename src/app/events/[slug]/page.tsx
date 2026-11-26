import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, ExternalLink } from "lucide-react";
import Image from "next/image";
import { events, getEventBySlug } from "@/content/events";
import { eventDayRange, eventStatusLabel } from "@/lib/utils";

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const eventYear = (event.startDate ?? event.currentDate).slice(0, 4);

  return (
    <div className="event-detail-page">
      {/* Reschedule notice */}
      {event.rescheduleNotice && (
        <div
          className="py-4 px-6"
          style={{ backgroundColor: "var(--color-climate-coral)" }}
          role="alert"
        >
          <div className="container-yge event-notice-inner">
            <AlertTriangle
              size={16}
              aria-hidden="true"
              style={{ color: "var(--color-paper-white)" }}
            />
            <p
              className="font-mono text-sm"
              style={{ color: "var(--color-paper-white)" }}
            >
              {event.rescheduleNotice}
            </p>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="event-detail-hero" aria-label={`${event.title} hero`}>
        <div
          className={`container-yge event-hero-grid${event.image ? "" : " event-hero-solo"}`}
        >
          <div className="event-hero-copy">
            <div className="event-hero-kicker">
              {eventStatusLabel(event.status)} / {eventYear}
            </div>
            <h1>
              {event.shortTitle}
              {!event.shortTitle.includes(eventYear) && (
                <span>{eventYear}</span>
              )}
            </h1>
            <p className="event-hero-tagline">{event.tagline}</p>
            {event.theme && <p className="event-hero-theme">{event.theme}</p>}
            {event.registrationStatus && (
              <p className="event-registration">
                Registration: {event.registrationStatus}
              </p>
            )}
            <Link href="/snapshots" className="event-back-link">
              <ArrowLeft size={14} aria-hidden="true" /> Our snapshots
            </Link>
          </div>
          {event.image && (
            <div className="event-hero-art">
              <Image
                src={event.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
              <span className="event-hero-art-label">
                YGE / FLAGSHIP COMPETITION
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="event-facts" aria-label="Event facts">
        <div className="container-yge event-facts-grid">
          <div>
            <b>
              {eventDayRange(
                event.startDate ?? event.currentDate,
                event.endDate,
              )}
            </b>
            <span>
              {new Date(
                event.startDate ?? event.currentDate,
              ).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
            </span>
          </div>
          <div>
            <b>{event.city}</b>
            <span>
              {event.venue !== event.city ? event.venue : event.country}
            </span>
          </div>
          {event.prizePool && (
            <div>
              <b>{event.prizePool}</b>
              <span>Total prize pool</span>
            </div>
          )}
          {event.segments && event.segments.length > 0 && (
            <div>
              <b>{event.segments.length}</b>
              <span>Competition segments</span>
            </div>
          )}
        </div>
      </section>
      <main className="event-detail-main">
        <div className="container-yge">
          <section className="event-intro">
            <div className="event-section-label">
              <span>01</span>
              <strong>
                About
                <br />
                {event.shortTitle}
              </strong>
            </div>
            <div>
              <p className="event-lede">{event.description}</p>
              {event.rescheduleNotice && (
                <p className="event-reschedule">{event.rescheduleNotice}</p>
              )}
            </div>
          </section>
          {event.prizePool && (
            <section className="event-prize">
              <span>Total prize pool</span>
              <strong>{event.prizePool}</strong>
              <em>{event.motto}</em>
            </section>
          )}
          {event.segments && event.segments.length > 0 && (
            <section className="event-segments">
              <header>
                <div>
                  <span>02 / PROGRAMME</span>
                  <h2>
                    Competition
                    <br />
                    Segments
                  </h2>
                </div>
                <strong>{event.segments.length}</strong>
              </header>
              <div className="event-segment-list">
                {event.segments.map((seg, i) => (
                  <article key={seg.name}>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <div>
                      <h3>{seg.name}</h3>
                      <p>{seg.description}</p>
                    </div>
                    <span>{seg.prize}</span>
                  </article>
                ))}
              </div>
            </section>
          )}
          <section className="event-participation">
            <div>
              <span>03 / PARTICIPATION</span>
              <h2>Who can join?</h2>
              {event.eligibility && <p>{event.eligibility}</p>}
            </div>
            <div>
              <span>Organized by</span>
              {event.organizers.map((org) => (
                <p key={org}>{org}</p>
              ))}
            </div>
          </section>
          <section className="event-final-cta">
            <div>
              <span>
                {event.status === "past"
                  ? "THANK YOU FOR TAKING PART"
                  : "READY TO TAKE PART?"}
              </span>
              <h2>
                {event.shortTitle}
                {!event.shortTitle.includes(eventYear) && ` ${eventYear}`}
              </h2>
            </div>
            <div>
              <p>{event.contactEmail}</p>
              <a href={`mailto:${event.contactEmail}`} className="lime-button">
                Contact YGE <ExternalLink size={14} aria-hidden="true" />
              </a>
              {event.status === "past" && event.recapStorySlug ? (
                <Link
                  href={`/stories/${event.recapStorySlug}`}
                  className="event-register-link"
                >
                  Read the recap
                </Link>
              ) : (
                event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-register-link"
                  >
                    Register now <ExternalLink size={13} />
                  </a>
                )
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
