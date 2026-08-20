import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Story } from '@/types';
import { formatDate, readingTimeLabel } from '@/lib/utils';

export default function ArticleMetadataRail({ story }: { story: Story }) {
  return (
    <aside className="article-metadata-rail" aria-label="Article information">
      <Link href="/stories" className="article-back-link">
        <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" /> All Stories
      </Link>
      {story.type && <span className="article-rail-category">{story.type}</span>}
      <dl>
        {story.date && (
          <div>
            <dt>Published</dt>
            <dd><time dateTime={story.date}>{formatDate(story.date)}</time></dd>
          </div>
        )}
        {story.readingTime && (
          <div>
            <dt>Reading time</dt>
            <dd>{readingTimeLabel(story.readingTime)}</dd>
          </div>
        )}
        {story.author && (
          <div>
            <dt>Author</dt>
            <dd>{story.author}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
