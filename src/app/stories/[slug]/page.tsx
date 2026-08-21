import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StoryArticleLayout from "@/components/stories/article/StoryArticleLayout";
import { getStoryBySlug, stories } from "@/content/stories";
import "./story-article.css";

export async function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: story.title,
    description: story.excerpt,
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const storyIndex = stories.findIndex((entry) => entry.slug === story.slug);
  const previousStory = storyIndex > 0 ? stories[storyIndex - 1] : null;
  const nextStory =
    storyIndex < stories.length - 1 ? stories[storyIndex + 1] : null;

  return (
    <StoryArticleLayout
      story={story}
      previousStory={previousStory}
      nextStory={nextStory}
    />
  );
}
