import Image from "next/image";
import type { Story } from "@/types";

export default function ArticleGallery({ story }: { story: Story }) {
  if (!story.gallery?.length) return null;

  return (
    <section
      className="article-gallery"
      aria-label={`Image gallery for ${story.title}`}
    >
      {story.gallery.map((src, index) => (
        <figure
          key={src}
          className={index === 0 ? "article-gallery-wide" : undefined}
        >
          <div className="article-gallery-media">
            <Image
              src={src}
              alt={`Supporting editorial artwork ${index + 1} for ${story.title}`}
              fill
              sizes="(min-width: 1024px) 52vw, (min-width: 768px) 72vw, 100vw"
              className="article-media-image"
            />
          </div>
        </figure>
      ))}
    </section>
  );
}
