import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Story } from "@/types";
import { formatDate, readingTimeLabel } from "@/lib/utils";

export default function StoryArchiveGrid({ stories }: { stories: Story[] }) {
  if (stories.length === 0) return null;

  return (
    <section className="stories-archive" aria-label="More stories">
      {stories.map((story) => (
        <article
          className="stories-archive-card"
          key={story.slug}
          aria-labelledby={`archive-story-${story.slug}`}
        >
          <Link
            href={`/stories/${story.slug}`}
            className="stories-archive-link"
          >
            <div className="stories-archive-image">
              <Image
                src={story.heroImage}
                alt={story.heroAlt ?? `Editorial artwork for ${story.title}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                unoptimized
                className={`stories-archive-image-media${
                  story.heroWidth ? " is-poster" : ""
                }`}
              />
            </div>

            <div className="stories-archive-copy">
              <div className="stories-archive-meta">
                <span>{story.type}</span>
                <time dateTime={story.date}>{formatDate(story.date)}</time>
                <span>{readingTimeLabel(story.readingTime)}</span>
              </div>
              <h2 id={`archive-story-${story.slug}`}>{story.title}</h2>
              <p>{story.excerpt}</p>
              <span className="stories-archive-cta">
                Read Story{" "}
                <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
}
