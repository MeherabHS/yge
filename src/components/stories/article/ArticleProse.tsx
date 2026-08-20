import Image from 'next/image';
import type { StoryBlock } from '@/types';

function ArticleFigure({ block }: { block: Extract<StoryBlock, { type: 'image' }> }) {
  return (
    <figure className="article-figure">
      <div className="article-figure-media">
        <Image
          src={block.src}
          alt={block.alt}
          fill
          sizes="(min-width: 1024px) 72vw, 100vw"
          className="article-media-image"
        />
      </div>
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}

function ArticleBlock({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.text}</p>;
    case 'heading': {
      const Heading = `h${block.level}` as 'h2' | 'h3';
      return <Heading>{block.text}</Heading>;
    }
    case 'quote':
      return (
        <blockquote className="article-inline-quote">
          <p>&ldquo;{block.text}&rdquo;</p>
          {block.attribution && <cite>— {block.attribution}</cite>}
        </blockquote>
      );
    case 'list':
      return (
        <ul>
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case 'image':
      return <ArticleFigure block={block} />;
    default:
      return null;
  }
}

export default function ArticleProse({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="article-prose">
      {blocks.map((block, index) => <ArticleBlock block={block} key={`${block.type}-${index}`} />)}
    </div>
  );
}
