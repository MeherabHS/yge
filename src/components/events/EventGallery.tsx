'use client';

import { useMemo, useState } from 'react';
import type { EventGalleryCategory, PublicEventGalleryPhoto } from '@/content/event-gallery';
import { eventGalleryCategories } from '@/content/event-gallery';
import EventGalleryFilters from './EventGalleryFilters';
import EventGalleryImage from './EventGalleryImage';

export default function EventGallery({ photos }: { photos: PublicEventGalleryPhoto[] }) {
  const [active, setActive] = useState<'all' | EventGalleryCategory>('all');
  const visiblePhotos = useMemo(
    () => photos
      .filter((photo) => photo.visible !== false)
      .filter((photo) => active === 'all' || photo.category === active)
      .sort((a, b) => a.order - b.order),
    [active, photos],
  );

  return (
    <section className="events-moments" aria-labelledby="events-moments-title">
      <div className="events-shell events-moments-layout">
        <header className="events-moments-heading">
          <h2 id="events-moments-title">Moments<br />in motion</h2>
          <i aria-hidden="true" />
          <EventGalleryFilters active={active} onChange={setActive} categories={eventGalleryCategories} />
        </header>
        <div>
          <p className="sr-only" aria-live="polite">{visiblePhotos.length} gallery items shown.</p>
          {visiblePhotos.length > 0 ? (
            <div className="events-photo-grid">
              {visiblePhotos.map((photo) => (
                <figure className={`events-photo events-photo-${photo.layout}`} key={photo.id}>
                  <EventGalleryImage
                    src={photo.src}
                    alt={photo.alt}
                    placeholder={photo.placeholder}
                    objectPosition={photo.objectPosition}
                    sizes="(max-width: 680px) 92vw, (max-width: 1024px) 44vw, 30vw"
                  />
                  <figcaption>
                    <span>{photo.caption ?? photo.eventTitle ?? 'Photo placeholder'}</span>
                    {(photo.location || photo.date || photo.year) && (
                      <small>{[photo.location, photo.date, photo.year].filter(Boolean).join(' · ')}</small>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="events-gallery-empty">No verified photographs are available for this category yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
