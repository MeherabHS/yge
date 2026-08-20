import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Story } from '@/types';
import { formatDate, readingTimeLabel } from '@/lib/utils';
import ArticleGallery from './ArticleGallery';
import ArticleMetadataRail from './ArticleMetadataRail';
import ArticleProse from './ArticleProse';

interface StoryArticleLayoutProps {
  story: Story;
  previousStory: Story | null;
  nextStory: Story | null;
}

export default function StoryArticleLayout({ story, previousStory, nextStory }: StoryArticleLayoutProps) {
  return (
    <div className="story-detail-page">
      <header className="story-article-header">
        <div className="container-yge story-article-container">
          <Link href="/stories" className="story-header-back">
            <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" /> All Stories
          </Link>
          {story.type && <span className="story-header-category">{story.type}</span>}
          <h1>{story.title}</h1>
          <div className="story-header-meta">
            {story.date && <time dateTime={story.date}>{formatDate(story.date)}</time>}
            {story.readingTime && <span>{readingTimeLabel(story.readingTime)}</span>}
            {story.author && <span>By {story.author}</span>}
          </div>
        </div>
      </header>

      <section className="story-article-body">
        <div className="container-yge story-article-container">
          <div className="story-article-layout">
            <ArticleMetadataRail story={story} />

            <article className="story-article-main">
              <p className="story-article-intro">{story.excerpt}</p>

              {story.heroImage && (
                <figure className="story-article-hero">
                  <div className="story-article-hero-media">
                    <Image
                      src={story.heroImage}
                      alt={`Editorial artwork for ${story.title}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 72vw, 100vw"
                      className="article-media-image"
                    />
                  </div>
                </figure>
              )}

              {story.pullQuote && (
                <blockquote id="article-pull-quote" className="article-pull-quote">
                  &ldquo;{story.pullQuote}&rdquo;
                </blockquote>
              )}

              <ArticleProse blocks={story.body} />
              <ArticleGallery story={story} />

              {story.tags.length > 0 && (
                <div className="article-tags" aria-label="Article tags">
                  {story.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}

              <nav className="article-story-navigation" aria-label="Story navigation">
                {previousStory ? (
                  <Link href={`/stories/${previousStory.slug}`} className="article-story-previous">
                    <span><ArrowLeft size={16} aria-hidden="true" /> Previous</span>
                    <strong>{previousStory.title}</strong>
                  </Link>
                ) : <span />}
                {nextStory && (
                  <Link href={`/stories/${nextStory.slug}`} className="article-story-next">
                    <span>Next <ArrowRight size={16} aria-hidden="true" /></span>
                    <strong>{nextStory.title}</strong>
                  </Link>
                )}
              </nav>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
