import type { EventArchiveFrame } from "@/content/event-gallery";
import EventGalleryImage from "./EventGalleryImage";

export default function ArchiveContactSheet({
  frames,
}: {
  frames: EventArchiveFrame[];
}) {
  const visibleFrames = frames
    .filter((frame) => frame.visible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="events-archive" aria-labelledby="events-archive-title">
      <div className="events-shell">
        <h2 id="events-archive-title">From the archive</h2>
        <div className="events-contact-sheet">
          {visibleFrames.map((frame) => (
            <figure key={frame.id}>
              <span>{frame.number}</span>
              <EventGalleryImage
                src={frame.src}
                alt={frame.alt}
                placeholder={frame.placeholder}
                objectPosition={frame.objectPosition}
                sizes="(max-width: 680px) 46vw, 16vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
