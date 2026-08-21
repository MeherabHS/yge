'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PaperTexture, RiverContour, TornPaperEdge } from '@/components/editorial/EditorialPrimitives';
import { media } from '@/content/media';
import { imagePlaceholders } from '@/content/image-placeholders';

export default function WorkHero() {
  return (
    <section className="work-hero" aria-labelledby="work-title">
      <PaperTexture />
      <RiverContour className="work-hero-contours" />
      <div className="work-shell work-hero-grid">
        <div className="work-hero-copy">
          <span className="section-kicker">Our work</span>
          <motion.h1 id="work-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
            <span>The work,</span>
            <em>organized.</em>
          </motion.h1>
          <p>YGE turns awareness into action through climate education, youth advocacy, creative media and community work across Bangladesh.</p>
          <motion.ul className="work-hero-tags" initial="hidden" animate="shown" variants={{ hidden: {}, shown: { transition: { staggerChildren: .08 } } }} aria-label="Work focus">
            {['Bangladesh', 'Youth-led', 'Climate action'].map((label) => <motion.li key={label} variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}>{label}</motion.li>)}
          </motion.ul>
        </div>
        <motion.div className="work-hero-artwork" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }}>
          <div className="work-hero-collage">
            <div className="work-hero-image">
              <Image src={media.workHeroPlaceholder} alt="Editorial collage of Bangladesh delta waterways, campus architecture, botanical drawings and a traditional riverboat." fill priority placeholder="blur" blurDataURL={imagePlaceholders.workHero} sizes="(max-width: 767px) 100vw, 55vw" />
            </div>
          </div>
          <div className="work-art-labels" aria-hidden="true"><span>Bangladesh</span><span>Youth-led</span></div>
        </motion.div>
      </div>
      <TornPaperEdge />
    </section>
  );
}
