import type { PublicEventGalleryPhoto } from '@/content/event-gallery';
import { PaperTexture } from '@/components/editorial/EditorialPrimitives';
import EventsHeroCollage from './EventsHeroCollage';

export default function EventsHero({ photos }: { photos: PublicEventGalleryPhoto[] }) {
  return (
    <section className="events-gallery-hero" aria-labelledby="events-page-title">
      <PaperTexture />
      <svg className="events-hero-contours" viewBox="0 0 900 540" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <path key={index} d={`M-50 ${82 + index * 31}C175 ${-20 + index * 33} 292 ${162 + index * 22} 495 ${68 + index * 31}S750 ${18 + index * 30} 960 ${130 + index * 25}`} />
        ))}
      </svg>
      <div className="events-shell events-hero-grid">
        <div className="events-hero-copy">
          <p className="events-kicker">Gatherings &amp; competitions</p>
          <h1 id="events-page-title">
            <span>Where action</span>
            <span>comes <em>alive.</em></span>
          </h1>
          <i aria-hidden="true" />
          <p>YGE events bring young people together to compete, collaborate, learn and lead.</p>
        </div>
        <EventsHeroCollage photos={photos} />
      </div>
    </section>
  );
}
