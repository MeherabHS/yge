import type { Metadata } from "next";
import FeaturedStorySpread from "@/components/stories/FeaturedStorySpread";
import StoryArchiveGrid from "@/components/stories/StoryArchiveGrid";
import StoriesMasthead from "@/components/stories/StoriesMasthead";
import { getFeaturedStory, stories } from "@/content/stories";
import "./stories.css";

export const metadata: Metadata = {
  title: "Stories & Field Notes — Youth for a Green Earth",
  description:
    "Impact stories, field notes, campaign updates and announcements from Youth for a Green Earth.",
};

export default function StoriesPage() {
  const featured = getFeaturedStory() ?? stories[0];
  const archiveStories = featured
    ? stories.filter((story) => story.slug !== featured.slug)
    : stories;

  return (
    <div className="stories-index-page">
      <section className="stories-masthead-section">
        <div className="container-yge stories-container">
          <StoriesMasthead />
        </div>
      </section>

      <div className="stories-transition" aria-hidden="true">
        <div className="container-yge stories-transition-inner">
          <span />
        </div>
      </div>

      <section className="stories-content-section" aria-label="Story index">
        <div className="container-yge stories-container">
          {featured && <FeaturedStorySpread story={featured} />}
          <StoryArchiveGrid stories={archiveStories} />
        </div>
      </section>
    </div>
  );
}
