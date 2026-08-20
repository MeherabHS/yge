'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ecoPapers } from '@/content/eco-papers';

export default function EcoPapersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Eco Papers Publications"
      className="section-pad grain"
      style={{ backgroundColor: 'var(--color-future-violet)', color: 'var(--color-paper-white)' }}
    >
      <div className="container-yge">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text & Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={18} style={{ color: 'var(--color-acid-leaf)' }} aria-hidden="true" />
              <span
                className="font-mono text-xs uppercase tracking-widest font-bold"
                style={{ color: 'var(--color-acid-leaf)' }}
              >
                Publication Series
              </span>
            </div>

            <h2
              className="font-display font-800 text-display leading-tight tracking-tight"
              style={{ color: 'var(--color-paper-white)' }}
            >
              Read. Question.{' '}
              <em className="font-serif not-italic" style={{ color: 'var(--color-acid-leaf)' }}>
                Act.
              </em>
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl" style={{ color: 'var(--color-warm-cream)' }}>
              &ldquo;Ideas for a planet under pressure.&rdquo;
            </p>

            <p className="text-body-lg leading-relaxed max-w-xl" style={{ color: 'rgba(245,241,231,0.85)' }}>
              Eco Papers is YGE&apos;s open-access publication series — independent environmental research, field insights and policy ideas written and designed by Bangladesh&apos;s youth.
            </p>

            {/* Compact Issue List Preview */}
            <div className="space-y-3 pt-2">
              {ecoPapers.map((paper) => (
                <Link
                  key={paper.id}
                  href={`/eco-papers/${paper.slug}`}
                  className="p-4 rounded-xl border border-white/20 flex items-center justify-between gap-4 transition-all hover:bg-black/20 hover:border-[var(--color-acid-leaf)] group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--color-acid-leaf)', color: 'var(--color-forest-ink)' }}
                    >
                      Issue {paper.issueNumber}
                    </span>
                    <div>
                      <p className="font-display font-700 text-base group-hover:text-[var(--color-acid-leaf)] transition-colors">
                        {paper.title}
                      </p>
                      <p className="font-mono text-[10px]" style={{ color: 'var(--color-warm-cream)', opacity: 0.7 }}>
                        Author: {paper.author} &middot; Designer: {paper.designer}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: 'var(--color-acid-leaf)' }} />
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/eco-papers"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-7 py-3.5 rounded-full font-700 transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--color-acid-leaf)', color: 'var(--color-forest-ink)' }}
              >
                Explore All Eco Papers <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Overlapping Tilt Cover Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[3/4]">
              {ecoPapers.slice(0, 2).map((paper, index) => (
                <div
                  key={paper.slug}
                  className={`absolute w-[80%] aspect-[3/4] overflow-hidden shadow-2xl border border-white/20 transition-transform duration-500 ${index === 0 ? 'top-0 left-0 z-10' : 'top-6 right-0'}`}
                  style={{ transform: index === 0 ? 'rotate(-4deg)' : 'rotate(7deg)' }}
                >
                  <Image
                    src={paper.coverImage}
                    alt={paper.coverAlt}
                    fill
                    sizes="(min-width: 1024px) 320px, 72vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
