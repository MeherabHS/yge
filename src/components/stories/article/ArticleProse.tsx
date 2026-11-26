import Image from "next/image";
import type { StoryBlock } from "@/types";

function ArticleFigure({
  block,
}: {
  block: Extract<StoryBlock, { type: "image" }>;
}) {
  const { width, height } = block;
  const hasSize = Boolean(width && height);
  const portrait = Boolean(width && height && height > width);
  // Photos with a known size keep their own proportions; portraits stay narrow.
  return (
    <figure
      className="article-figure"
      style={portrait ? { maxWidth: 560 } : undefined}
    >
      <div
        className="article-figure-media"
        style={hasSize ? { aspectRatio: `${width} / ${height}` } : undefined}
      >
        <Image
          src={block.src}
          alt={block.alt}
          fill
          sizes={
            portrait
              ? "(min-width: 768px) 560px, 100vw"
              : "(min-width: 1024px) 72vw, 100vw"
          }
          unoptimized
          className="article-media-image"
        />
      </div>
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}

function ArticleBlock({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading": {
      const Heading = `h${block.level}` as "h2" | "h3";
      return <Heading>{block.text}</Heading>;
    }
    case "quote":
      return (
        <blockquote className="article-inline-quote">
          <p>&ldquo;{block.text}&rdquo;</p>
          {block.attribution && <cite>— {block.attribution}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul
          className={
            block.variant === "placards" ? "article-placards" : undefined
          }
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return <ArticleFigure block={block} />;
    default:
      return null;
  }
}

export default function ArticleProse({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="article-prose">
      {blocks.map((block, index) => (
        <ArticleBlock block={block} key={`${block.type}-${index}`} />
      ))}
    </div>
  );
}
