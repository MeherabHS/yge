import type { EventAlbum } from '@/content/event-gallery';
import EventGalleryImage from './EventGalleryImage';

export default function EventAlbumRow({ album }: { album: EventAlbum }) {
  return (
    <article className="event-album-row">
      <div className="event-album-thumbnails" aria-label="Album image placeholders">
        {album.coverImages.slice(0, 3).map((src, index) => (
          <div className="event-album-thumbnail" key={`${album.id}-${src}-${index}`}>
            <EventGalleryImage
              src={src}
              alt="Neutral archival-paper placeholder for a future verified event album cover."
              placeholder
              sizes="(max-width: 680px) 45vw, 180px"
            />
          </div>
        ))}
      </div>
      <div className="event-album-copy">
        <h3>{album.title ?? 'Event album'}</h3>
        {(album.location || album.date) ? (
          <p>{[album.location, album.date].filter(Boolean).join(' · ')}</p>
        ) : (
          <p>Archive details pending verification</p>
        )}
        {typeof album.photoCount === 'number' && <small>{album.photoCount} photos</small>}
      </div>
      <button type="button" disabled aria-label="Album unavailable until its archive information is verified">
        Open album <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}
