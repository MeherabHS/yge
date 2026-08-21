'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Camera,
  GraduationCap,
  Leaf,
  Megaphone,
  Users,
} from 'lucide-react';
import { ecoPapers } from '@/content/eco-papers';
import { getFeaturedStory } from '@/content/stories';
import { siteConfig } from '@/content/site';
import { media } from '@/content/media';
import { imagePlaceholders } from '@/content/image-placeholders';

const manifesto = 'EDUCATE  ·  ORGANIZE  ·  CREATE  ·  ADVOCATE  ·  ACT  ·  LEARN  ·  COLLABORATE  ·  RESTORE  ·  ';

const posters = [
  {
    number: '01', title: 'Climate Education', copy: 'Building environmental literacy from primary schools to universities through art, discussion and hands-on learning.',
    href: '/work/little-green-artists', className: 'poster-education', icon: BookOpen,
  },
  {
    number: '02', title: 'Youth Voice & Advocacy', copy: 'Amplifying Bangladeshi youth perspectives in local and national climate conversations.',
    href: '/work/youth-in-action-cop29', className: 'poster-voice', icon: Megaphone,
  },
  {
    number: '03', title: 'Community Action', copy: 'Grassroots campaigns tackling plastic pollution, waste and ecological restoration across Bangladesh.',
    href: '/work/plastic-awareness-1', className: 'poster-community', icon: Users,
  },
  {
    number: '04', title: 'Creative Climate Media', copy: 'Documentaries, photography and storytelling that make environmental crises visible.',
    href: '/work/environmental-documentaries', className: 'poster-media', icon: Camera,
  },
  {
    number: '05', title: 'Green Campus Network', copy: 'Empowering young people to build more sustainable university communities.',
    href: '/work/project-green-campus', className: 'poster-campus', icon: GraduationCap,
  },
];

function RiverContours() {
  return (
    <svg className="river-contours" viewBox="0 0 520 420" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <path key={index} d={`M-60 ${90 + index * 22} C70 ${18 + index * 18}, 105 ${185 + index * 13}, 230 ${100 + index * 20} S410 ${42 + index * 22}, 580 ${120 + index * 17}`} />
      ))}
    </svg>
  );
}

function CampaignStamp({ light = false }: { light?: boolean }) {
  return (
    <div className={`campaign-stamp ${light ? 'campaign-stamp-light' : ''}`} aria-label="Youth for a Green Earth campaign mark">
      <span className="font-bengali">সবুজ পৃথিবীর জন্য</span>
      <Leaf aria-hidden="true" />
      <span className="font-bengali">আমরাই গড়ি</span>
    </div>
  );
}

function PosterIllustration({ Icon }: { Icon: typeof BookOpen }) {
  return (
    <div className="poster-illustration" aria-hidden="true">
      <Icon strokeWidth={1.35} />
      <span />
    </div>
  );
}

function ProgramPoster({ poster }: { poster: (typeof posters)[number] }) {
  const Icon = poster.icon;
  return (
    <motion.article whileHover={{ y: -10, rotate: 0 }} transition={{ duration: 0.25 }} className={poster.className}>
      <Link href={poster.href} className="program-poster">
        <span className="poster-number">{poster.number}</span>
        <h3>{poster.title}</h3>
        <p>{poster.copy}</p>
        <PosterIllustration Icon={Icon} />
        <span className="sr-only">Explore {poster.title}</span>
      </Link>
    </motion.article>
  );
}

function BangladeshActionMap() {
  return (
    <div className="bangladesh-graphic">
      <Image
        src={media.bangladeshActionMap}
        alt="Stylized map of Bangladesh with river and delta lines"
        width={1536}
        height={1536}
        sizes="(min-width: 1024px) 340px, 62vw"
        className="bangladesh-action-map-image h-auto w-full object-contain"
      />
    </div>
  );
}

export default function HomeEditorial() {
  const story = getFeaturedStory();
  return (
    <div className="home-editorial">
      <section className="editorial-hero" aria-labelledby="home-title">
        <Image src={media.heroDeltaCollage} alt="Aerial collage of the Bangladesh river delta and a traditional river boat" fill priority placeholder="blur" blurDataURL={imagePlaceholders.heroDeltaCollage} className="hero-collage" sizes="100vw" />
        <div className="hero-shade" aria-hidden="true" />
        <RiverContours />
        <div className="hero-copy">
          <motion.span initial={{ opacity: 0, rotate: -8, y: 12 }} animate={{ opacity: 1, rotate: -6, y: 0 }} className="campaign-label label-outline">Since 2024</motion.span>
          <motion.h1 id="home-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            Bangladesh&apos;s<br /> youth are not<br /> waiting for a<br />
            <strong>greener future.</strong><br />
            <em>They&apos;re building it.</em>
          </motion.h1>
          <p>{siteConfig.description}</p>
          <Link href="/work" className="ink-button">Explore our work <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="hero-labels" aria-hidden="true">
          <span>Bangladesh</span><span>Youth-led</span><span>Climate action</span>
        </div>
        <div className="hero-stamp"><CampaignStamp /></div>
        <div className="torn-edge" aria-hidden="true" />
      </section>

      <section className="manifesto-marquee" aria-label="Our manifesto">
        <div className="marquee-track">
          <span>{manifesto.repeat(4)}</span><span aria-hidden="true">{manifesto.repeat(4)}</span>
        </div>
      </section>

      <section className="program-spread paper-surface" aria-labelledby="programs-title">
        <div className="program-intro">
          <span className="section-kicker">Our work</span>
          <h2 id="programs-title">From classrooms<br />to communities,<br /><em>action takes<br />many forms.</em></h2>
          <Link href="/work" className="text-link">View all programs <ArrowRight aria-hidden="true" /></Link>
          <svg className="scribble-arrow" viewBox="0 0 130 90" aria-hidden="true"><path d="M7 82c7-41 38-69 78-57 21 7 6 28-10 18-14-9 11-25 44-30M107 5l12 8-13 7" /></svg>
        </div>
        <div className="poster-grid">
          {posters.map((poster) => <ProgramPoster key={poster.number} poster={poster} />)}
        </div>
      </section>

      <section className="eco-feature" aria-labelledby="eco-title">
        <div className="eco-halftone" aria-hidden="true" />
        <div className="eco-copy">
          <span className="section-kicker lime">Eco papers</span>
          <h2 id="eco-title">Field notes for<br /><em>a changing climate.</em></h2>
          <p>YGE&apos;s publication series brings youth research, environmental observation and ideas into public view.</p>
          <Link href="/eco-papers" className="lime-button">Explore Eco Papers <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="eco-covers" aria-label="Eco Paper issue index">
          {ecoPapers.map((paper, index) => (
            <motion.article key={paper.slug} whileHover={{ y: -8 }} className={`eco-paper-entry cover-${index + 1}`}>
              <Link
                href={`/eco-papers/${paper.slug}`}
                className="eco-cover"
                style={{ aspectRatio: paper.coverAspectRatio ?? '3 / 4' }}
              >
                <Image
                  src={paper.coverImage}
                  alt={paper.coverAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 42vw, 82vw"
                  className="object-contain"
                />
              </Link>
              <Link className="eco-issue-link" href={`/eco-papers/${paper.slug}`}>
                <b>{paper.issueNumber}</b><span>{paper.title}</span><ArrowRight aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {story && (
        <section className="field-stories paper-surface" aria-labelledby="stories-title">
          <div className="map-column">
            <span className="section-kicker">Stories from the field</span>
            <h2 id="stories-title">Real places.<br />Real challenges.<br /><em>Real youth action.</em></h2>
            <BangladeshActionMap />
            <CampaignStamp light />
          </div>
          <aside className="field-note" aria-label="Field note">
            <span>Field note</span>
            <p>Environmental action begins by listening to the people who live closest to change.</p>
            <small>— YGE FIELD TEAM</small>
          </aside>
          <article className="featured-field-story">
            <div className="story-art" aria-hidden="true"><span /><span /><span /></div>
            <div>
              <span className="campaign-label">Feature story</span>
              <h3>{story.title}</h3>
              <p>{story.excerpt}</p>
              <Link href={`/stories/${story.slug}`} className="text-link">Read story <ArrowRight aria-hidden="true" /></Link>
            </div>
          </article>
        </section>
      )}

      <section className="join-strip" aria-labelledby="join-title">
        <h2 id="join-title">Start something with us.</h2>
        <p>Be part of a nationwide youth movement for climate justice and a greener Bangladesh.</p>
        <Link href="/contact" className="dark-button">Contact YGE <ArrowRight aria-hidden="true" /></Link>
        <CampaignStamp light />
      </section>
    </div>
  );
}
