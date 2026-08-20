import type { EventAlbum } from '@/content/event-gallery';
import { PaperTexture, TornPaperEdge } from '@/components/editorial/EditorialPrimitives';
import EventAlbumRow from './EventAlbumRow';

export default function EventAlbums({ albums }: { albums: EventAlbum[] }) {
  const visibleAlbums = albums.filter((album) => album.visible !== false).sort((a, b) => a.order - b.order);

  return (
    <section className="event-albums" aria-labelledby="event-albums-title">
      <PaperTexture />
      <TornPaperEdge position="top" />
      <div className="events-shell event-albums-layout">
        <header><h2 id="event-albums-title">Event albums</h2><i aria-hidden="true" /></header>
        <div className="event-album-list">
          {visibleAlbums.map((album) => <EventAlbumRow album={album} key={album.id} />)}
        </div>
      </div>
      <TornPaperEdge />
    </section>
  );
}
