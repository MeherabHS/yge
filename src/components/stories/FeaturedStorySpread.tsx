import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/types";
import { formatDate, readingTimeLabel } from "@/lib/utils";

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 66vw, 100vw"
      unoptimized
      className="stories-feature-image"
    />
  );
}

export default function FeaturedStorySpread({ story }: { story: Story }) {
  // Only real photos are shown; a lone hero fills the whole gallery panel.
  const supportImages = (story.gallery ?? []).filter(Boolean).slice(0, 2);

  return (
    <article
      className="stories-feature"
      aria-labelledby={`story-${story.slug}`}
    >
      <div className="stories-feature-copy">
        <div>
          <p className="stories-feature-label">Featured Story</p>
          <span className="stories-feature-label-rule" aria-hidden="true" />
        </div>

        <div className="stories-feature-meta">
          <span className="stories-category">{story.type}</span>
          <div className="stories-feature-date-line">
            <time dateTime={story.date}>{formatDate(story.date)}</time>
            <span>{readingTimeLabel(story.readingTime)}</span>
          </div>
        </div>

        <h2 id={`story-${story.slug}`}>{story.title}</h2>
        <p className="stories-feature-excerpt">{story.excerpt}</p>
      </div>

      <div
        className={`stories-feature-gallery${
          supportImages.length === 0 ? " stories-feature-gallery-single" : ""
        }`}
      >
        <div className="stories-feature-lead">
          <StoryImage
            src={story.heroImage}
            alt={story.heroAlt ?? `Lead editorial artwork for ${story.title}`}
          />
          <span
            className="stories-gallery-tape stories-gallery-tape-top"
            aria-hidden="true"
          />
        </div>
        {supportImages.map((src, index) => (
          <div className="stories-feature-support" key={src}>
            <StoryImage
              src={src}
              alt={`Supporting editorial artwork for ${story.title}`}
            />
            {index === 1 && (
              <span
                className="stories-gallery-tape stories-gallery-tape-bottom"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      <div className="stories-feature-link-cell">
        <Link href={`/stories/${story.slug}`} className="stories-read-link">
          Read Full Story{" "}
          <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
