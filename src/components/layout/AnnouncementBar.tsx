'use client';

import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { getFeaturedEvent } from '@/content/events';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const event = getFeaturedEvent();

  if (dismissed || !event?.rescheduleNotice) return null;

  return (
    <div
      role="banner"
      aria-label="Site announcement"
      style={{
        backgroundColor: 'var(--color-climate-coral)',
        color: 'var(--color-paper-white)',
      }}
      className="relative z-50 py-2 px-4 text-center"
    >
      <div className="container-yge flex items-center justify-center gap-3 flex-wrap">
        <p className="text-sm font-body font-medium leading-snug">
          <span className="font-mono text-xs uppercase tracking-widest opacity-75 mr-2">
            Update
          </span>
          {event.rescheduleNotice}
        </p>
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider underline underline-offset-2 hover:opacity-75 transition-opacity whitespace-nowrap"
          aria-label={`View event: ${event.title}`}
        >
          View Event <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-75 transition-opacity"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
