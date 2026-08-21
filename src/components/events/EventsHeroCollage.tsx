import type { PublicEventGalleryPhoto } from "@/content/event-gallery";
import EventGalleryImage from "./EventGalleryImage";

export default function EventsHeroCollage({
  photos,
}: {
  photos: PublicEventGalleryPhoto[];
}) {
  return (
    <div
      className="events-hero-collage"
      aria-label="Demo layout for future verified event photography"
    >
      <div className="events-hero-paper" aria-hidden="true" />
      {photos.slice(0, 4).map((photo, index) => (
        <figure
          className={`events-hero-frame events-hero-frame-${index + 1}`}
          key={photo.id}
        >
          <EventGalleryImage
            src={photo.src}
            alt={photo.alt}
            placeholder={photo.placeholder}
            objectPosition={photo.objectPosition}
            priority={index === 0}
            sizes="(max-width: 767px) 84vw, 34vw"
          />
        </figure>
      ))}
      <span className="events-field-stamp" aria-hidden="true">
        Field archive
      </span>
      <span className="events-hero-tape" aria-hidden="true" />
    </div>
  );
}
