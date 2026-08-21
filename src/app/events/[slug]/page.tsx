import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Trophy,
  Users,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { events, getEventBySlug, formatEventDate } from "@/content/events";

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

  return (
    <div style={{ backgroundColor: "var(--color-paper-white)" }}>
      {/* Reschedule notice */}
      {event.rescheduleNotice && (
        <div
          className="py-4 px-6"
          style={{ backgroundColor: "var(--color-climate-coral)" }}
          role="alert"
        >
          <div className="container-yge flex items-center gap-3">
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
      <section
        className="section-pad pt-24"
        style={{ backgroundColor: "var(--color-forest-ink)" }}
        aria-label={`${event.title} hero`}
      >
        <div className="container-yge">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-8 hover:opacity-75"
            style={{ color: "var(--color-muted-sage)" }}
          >
            <ArrowLeft size={14} aria-hidden="true" /> All Events
          </Link>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(200,255,61,0.15)",
                  color: "var(--color-acid-leaf)",
                }}
              >
                {event.status}
              </span>
              {event.registrationStatus && (
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--color-muted-sage)" }}
                >
                  Registration: {event.registrationStatus}
                </span>
              )}
            </div>
            <h1
              className="font-display font-800 text-hero leading-tight tracking-tight mb-4"
              style={{ color: "var(--color-paper-white)" }}
            >
              {event.title}
            </h1>
            <p
              className="font-serif italic text-subhead mb-8"
              style={{ color: "var(--color-electric-teal)" }}
            >
              {event.tagline}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: "rgba(200,255,61,0.06)" }}
              >
                <Calendar
                  size={16}
                  aria-hidden="true"
                  style={{
                    color: "var(--color-acid-leaf)",
                    marginBottom: "0.5rem",
                  }}
                />
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--color-muted-sage)" }}
                >
                  Date
                </p>
                <p
                  className="font-display font-600 text-sm"
                  style={{ color: "var(--color-warm-cream)" }}
                >
                  {formatEventDate(event)}
                </p>
              </div>
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: "rgba(200,255,61,0.06)" }}
              >
                <MapPin
                  size={16}
                  aria-hidden="true"
                  style={{
                    color: "var(--color-acid-leaf)",
                    marginBottom: "0.5rem",
                  }}
                />
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--color-muted-sage)" }}
                >
                  Venue
                </p>
                <p
                  className="font-display font-600 text-sm"
                  style={{ color: "var(--color-warm-cream)" }}
                >
                  {event.venue}
                </p>
              </div>
              {event.prizePool && (
                <div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(200,255,61,0.06)" }}
                >
                  <Trophy
                    size={16}
                    aria-hidden="true"
                    style={{
                      color: "var(--color-solar-yellow)",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--color-muted-sage)" }}
                  >
                    Prize Pool
                  </p>
                  <p
                    className="font-display font-600 text-sm"
                    style={{ color: "var(--color-solar-yellow)" }}
                  >
                    {event.prizePool}
                  </p>
                </div>
              )}
              {event.segments && (
                <div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(200,255,61,0.06)" }}
                >
                  <Users
                    size={16}
                    aria-hidden="true"
                    style={{
                      color: "var(--color-electric-teal)",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--color-muted-sage)" }}
                  >
                    Segments
                  </p>
                  <p
                    className="font-display font-600 text-sm"
                    style={{ color: "var(--color-warm-cream)" }}
                  >
                    {event.segments.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="section-pad">
        <div className="container-yge">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-muted-sage)" }}
                >
                  About This Event
                </p>
                <p
                  className="text-body-lg leading-relaxed"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {event.description}
                </p>
              </div>
              {event.segments && event.segments.length > 0 && (
                <div>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-6"
                    style={{ color: "var(--color-muted-sage)" }}
                  >
                    Competition Segments
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {event.segments.map((seg, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border"
                        style={{ borderColor: "rgba(158,174,163,0.2)" }}
                      >
                        <p
                          className="font-display font-600 text-sm mb-1"
                          style={{ color: "var(--color-forest-ink)" }}
                        >
                          {seg.name}
                        </p>
                        {seg.description && (
                          <p
                            className="text-xs mb-2"
                            style={{ color: "var(--color-muted-sage)" }}
                          >
                            {seg.description}
                          </p>
                        )}
                        {seg.prize && (
                          <p
                            className="font-mono text-xs"
                            style={{ color: "var(--color-solar-yellow)" }}
                          >
                            {seg.prize}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {event.eligibility && (
                <div
                  className="p-5 rounded-2xl"
                  style={{ backgroundColor: "var(--color-mist-green)" }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-2"
                    style={{ color: "var(--color-muted-sage)" }}
                  >
                    Eligibility
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {event.eligibility}
                  </p>
                </div>
              )}
              <div
                className="p-5 rounded-2xl"
                style={{ backgroundColor: "var(--color-mist-green)" }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-muted-sage)" }}
                >
                  Organizers
                </p>
                {event.organizers.map((org) => (
                  <p
                    key={org}
                    className="font-display font-600 text-sm"
                    style={{ color: "var(--color-forest-ink)" }}
                  >
                    {org}
                  </p>
                ))}
              </div>
              {event.contactEmail && (
                <div
                  className="p-5 rounded-2xl"
                  style={{ backgroundColor: "var(--color-forest-ink)" }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-2"
                    style={{ color: "var(--color-muted-sage)" }}
                  >
                    Contact
                  </p>
                  <a
                    href={`mailto:${event.contactEmail}`}
                    className="font-mono text-sm hover:underline"
                    style={{ color: "var(--color-acid-leaf)" }}
                  >
                    {event.contactEmail}
                  </a>
                </div>
              )}
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider px-5 py-3 rounded-full font-700 w-full transition-all hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-acid-leaf)",
                    color: "var(--color-forest-ink)",
                  }}
                >
                  Register Now <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
