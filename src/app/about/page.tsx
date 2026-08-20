'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Camera, Eye, Leaf, Megaphone, ShieldCheck, Users, Waves } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { media } from '@/content/media';
import { aboutMissionStatement, aboutValues, aboutVisionStatement, verifiedAboutThemes, verifiedAboutTimeline, type AboutTheme, type AboutValue } from '@/content/about';
import { CampaignStamp, DeltaCollage, HalftonePattern, HandDrawnArrow, PaperTexture, RiverContour, TapeStrip, TornPaperEdge } from '@/components/editorial/EditorialPrimitives';

const valueIcons = { book: BookOpen, people: Users, camera: Camera, megaphone: Megaphone, leaf: Leaf };
const themeIcons = { awareness: Eye, crisis: Waves, action: Megaphone, future: Leaf };

function ThemeRow({ theme, index }: { theme: AboutTheme; index: number }) {
  const Icon = themeIcons[theme.icon];
  return (
    <motion.article
      className={`about-theme-row theme-${theme.color}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .3 }}
      transition={{ delay: index * .05 }}
    >
      <span className="about-theme-number">{theme.number}</span>
      <h3>{theme.title}</h3>
      <p>{theme.summary}</p>
      <Icon aria-hidden="true" />
    </motion.article>
  );
}

function ValueRow({ value, index }: { value: AboutValue; index: number }) {
  const Icon = valueIcons[value.illustration];
  return (
    <motion.article initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .35 }} transition={{ delay: index * .05 }} className={`about-value-row value-${value.color}`}>
      <span className="about-value-number">{value.number}</span>
      <div><h3>{value.title}</h3><p>{value.description}</p></div>
      <span className="about-value-illustration" aria-hidden="true"><Icon /><i /><i /></span>
    </motion.article>
  );
}

function TimelineRiver() {
  return (
    <section className="about-timeline paper-surface" aria-labelledby="journey-title">
      <div className="about-shell">
        <h2 className="section-kicker" id="journey-title">Our journey so far</h2>
        <div className="timeline-route" aria-hidden="true"><motion.svg viewBox="0 0 1000 70" preserveAspectRatio="none"><motion.path d="M0 38C88 8 151 53 236 31S390 51 476 28 635 57 718 30 885 48 1000 18" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3 }} /></motion.svg></div>
        <div className="timeline-items">
          {verifiedAboutTimeline.map((item, index) => (
            <article key={`${item.period}-${item.title}`}>
              <span className="timeline-node" aria-hidden="true"><i /></span>
              <small>{item.period}</small><h3>{item.title}</h3><p>{item.description}</p>
              {index === 0 && <Leaf className="timeline-motif timeline-leaf" aria-hidden="true" />}
              {index === verifiedAboutTimeline.length - 1 && <svg className="timeline-motif timeline-boat" viewBox="0 0 70 35" aria-hidden="true"><path d="M4 25h61l-9 7H13zM35 24V3l20 18M35 4L17 21" /></svg>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="about-reference-page">
      <section className="about-reference-hero" aria-labelledby="about-title">
        <PaperTexture /><RiverContour />
        <div className="about-shell about-hero-grid">
          <div className="about-hero-copy">
            <span className="section-kicker">About YGE</span>
            <motion.h1 id="about-title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}><span>Awareness<br />starts it.</span><em>Action makes<br />it real.</em></motion.h1>
            <div className="about-hero-intro"><p>{siteConfig.description}</p><CampaignStamp dark /></div>
          </div>
          <motion.div className="about-hero-art" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }}>
            <DeltaCollage src={media.aboutDeltaCropped} />
            <div className="about-hero-labels" aria-hidden="true"><span>Youth-led</span><span>Since 2024</span></div>
          </motion.div>
        </div>
        <TornPaperEdge />
      </section>

      <section className="about-purpose" aria-label="Mission, vision and motto">
        <RiverContour className="purpose-contours" />
        <div className="about-shell purpose-grid">
          <div className="purpose-mission">
            <span className="purpose-label">Our mission</span>
            <h2 className="purpose-title">Mission<br />for the<br />Earth</h2>
            <p className="purpose-statement">{aboutMissionStatement}</p>
          </div>
          <motion.aside initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="purpose-vision">
            <PaperTexture />
            <span className="purpose-label">Our vision</span>
            <h2 className="purpose-vision-title">Youth building an environmentally just future</h2>
            <p className="purpose-statement">{aboutVisionStatement}</p>
          </motion.aside>
          <div className="purpose-motto"><HandDrawnArrow /><strong>Transforming awareness into action</strong></div>
        </div>
        <TornPaperEdge />
      </section>

      <section className="about-approach paper-surface" aria-labelledby="approach-title">
        <PaperTexture />
        <div className="about-shell">
          <header className="about-approach-heading">
            <span className="section-kicker">Our approach</span>
            <h2 id="approach-title">How we turn awareness into action</h2>
          </header>
          <div className="about-theme-list">
            {verifiedAboutThemes.map((theme, index) => <ThemeRow key={theme.number} theme={theme} index={index} />)}
          </div>
        </div>
      </section>

      <section className="about-story" aria-labelledby="story-title">
        <HalftonePattern />
        <div className="about-shell about-story-grid">
          <div className="about-story-copy"><span>Our story</span><h2 id="story-title">A movement built to turn awareness into action.</h2><p>Youth for a Green Earth was established in Bangladesh in 2024 to help young people move from environmental knowledge to practical action.</p><p>Its work brings together climate education, youth advocacy, creative media, publications, campus initiatives and community campaigns.</p><p className="story-highlight">Awareness starts it. Action makes it real.</p></div>
          <div className="story-collage" role="img" aria-label="Campaign notes and a Bangladesh river landscape">
            <div className="story-note-main"><TapeStrip /><p>We don&apos;t wait<br />for change.<br />We <em>create</em> it.</p><span aria-hidden="true" /></div>
            <div className="story-river-art" aria-hidden="true"><Image src={media.aboutDeltaCropped} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
            <div className="story-note-side"><CampaignStamp dark /><p>From awareness to action—one idea, one conversation and one project at a time.</p><small>— YGE COMMUNITY</small></div>
          </div>
        </div>
        <TornPaperEdge />
      </section>

      <TimelineRiver />

      <section className="about-values paper-surface" aria-labelledby="values-title"><div className="about-shell"><h2 className="section-kicker" id="values-title">What we stand for</h2><div>{aboutValues.map((value, index) => <ValueRow key={value.number} value={value} index={index} />)}</div></div></section>

      <section className="about-commitments" aria-label="Safeguarding and transparency commitments"><div className="about-shell about-commitments-grid">
        <article><ShieldCheck aria-hidden="true" /><div><h2>Safe spaces. Stronger together.</h2><p>YGE is committed to the safety and wellbeing of participants in its programs, especially children and young people.</p><Link href="/safeguarding">Read the safeguarding draft <ArrowRight /></Link></div></article>
        <article><Eye aria-hidden="true" /><div><h2>Open. Accountable. Trusted.</h2><p>Our website explains its current data practices and provides direct routes for questions, corrections and requests.</p><Link href="/privacy">Read the privacy draft <ArrowRight /></Link></div></article>
      </div></section>

      <motion.section className="about-build-cta" aria-labelledby="build-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><TornPaperEdge position="top" /><div className="about-shell about-build-inner"><h2 id="build-title">Build with us.</h2><p>Whether you&apos;re a student, educator, artist or changemaker, there is a place for you in this movement.</p><Link href="/contact" className="dark-button">Contact YGE <ArrowRight /></Link><CampaignStamp dark /></div></motion.section>
    </div>
  );
}
