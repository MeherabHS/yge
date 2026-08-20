import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Story } from '@/types';
import { formatDate, readingTimeLabel } from '@/lib/utils';

function StoryImage({ story, src, position }: { story: Story; src?: string; position: string }) {
  if (!src) {
    return <div className="stories-image-placeholder" aria-hidden="true" />;
  }

  return (
    <Image
      src={src}
      alt={`${position} editorial artwork for ${story.title}`}
      fill
      loading="eager"
      sizes="(min-width: 1024px) 66vw, 100vw"
      className="stories-feature-image"
    />
  );
}

export default function FeaturedStorySpread({ story }: { story: Story }) {
  const images = [story.heroImage, ...(story.gallery ?? [])].slice(0, 3);

  return (
    <article className="stories-feature stories-grid-lines" aria-labelledby={`story-${story.slug}`}>
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

      <div className="stories-feature-gallery">
        <div className="stories-feature-lead">
          <StoryImage story={story} src={images[0]} position="Lead" />
          <span className="stories-gallery-tape stories-gallery-tape-top" aria-hidden="true" />
        </div>
        <div className="stories-feature-support">
          <StoryImage story={story} src={images[1]} position="Supporting" />
        </div>
        <div className="stories-feature-support">
          <StoryImage story={story} src={images[2]} position="Supporting" />
          <span className="stories-gallery-tape stories-gallery-tape-bottom" aria-hidden="true" />
        </div>
      </div>

      <div className="stories-feature-link-cell">
        <Link href={`/stories/${story.slug}`} className="stories-read-link">
          Read Full Story <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
