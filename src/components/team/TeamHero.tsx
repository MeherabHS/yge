import Image from 'next/image';
import type { TeamMember } from '@/content/team';
import { media } from '@/content/media';
import { TornPaperEdge } from '@/components/editorial/EditorialPrimitives';

export default function TeamHero({ featuredMembers }: { featuredMembers: TeamMember[] }) {
  return (
    <section
      className="team-hero"
      aria-labelledby="team-page-title"
      data-has-featured-members={featuredMembers.length > 0}
    >
      <div className="team-hero-background" aria-hidden="true">
        <Image
          src={media.heroDeltaCollage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="team-hero-background-image"
        />
      </div>
      <div className="team-hero-overlay" aria-hidden="true" />
      <div className="container-yge team-hero-content">
        <p className="team-eyebrow">Our team</p>
        <h1 id="team-page-title">
          <span>The people</span>
          <span>behind the</span>
          <em>action.</em>
        </h1>
        <p>A youth-led team organizing ideas, programs and communication for environmental action.</p>
      </div>
      <TornPaperEdge />
    </section>
  );
}
