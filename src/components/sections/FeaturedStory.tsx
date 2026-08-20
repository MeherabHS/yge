'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { getFeaturedStory } from '@/content/stories';
import { formatDate } from '@/lib/utils';

export default function FeaturedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const story = getFeaturedStory();
  if (!story) return null;

  return (
    <section
      ref={ref}
      aria-label="Featured story"
      className="section-pad"
      style={{ backgroundColor: 'var(--color-warm-cream)' }}
    >
      <div className="container-yge">
        <div className="flex items-center gap-3 mb-12">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--color-muted-sage)' }}
          >
            Featured Story
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: 'var(--color-muted-sage)', opacity: 0.3 }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Story visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative poster-style composition */}
            <div
              className="aspect-[4/5] rounded-2xl overflow-hidden relative"
              style={{ backgroundColor: 'var(--color-deep-moss)' }}
            >
              {/* SVG placeholder poster */}
              <svg
                className="w-full h-full"
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="400" height="500" fill="#123C2F" />
                {/* Background layers */}
                <ellipse cx="200" cy="350" rx="220" ry="180" fill="#071A14" opacity="0.6" />
                <ellipse cx="200" cy="200" rx="120" ry="120" fill="#C8FF3D" opacity="0.08" />
                {/* Tree / plant motif */}
                <line x1="200" y1="450" x2="200" y2="250" stroke="#C8FF3D" strokeWidth="3" opacity="0.6" />
                <ellipse cx="200" cy="230" rx="60" ry="70" fill="#00DDB3" opacity="0.3" />
                <ellipse cx="165" cy="270" rx="40" ry="50" fill="#C8FF3D" opacity="0.2" />
                <ellipse cx="235" cy="265" rx="45" ry="55" fill="#C8FF3D" opacity="0.15" />
                {/* Children represented as abstract shapes */}
                <circle cx="100" cy="400" r="15" fill="#FFD23F" opacity="0.7" />
                <circle cx="140" cy="390" r="12" fill="#FF5E56" opacity="0.6" />
                <circle cx="175" cy="395" r="14" fill="#C8FF3D" opacity="0.5" />
                <circle cx="225" cy="398" r="13" fill="#00DDB3" opacity="0.6" />
                <circle cx="260" cy="392" r="15" fill="#FFD23F" opacity="0.5" />
                <circle cx="300" cy="400" r="12" fill="#FF5E56" opacity="0.7" />
                {/* Text overlay */}
                <text x="40" y="80" fill="#C8FF3D" fontSize="11" fontFamily="monospace" opacity="0.8">LITTLE GREEN ARTISTS</text>
                <text x="40" y="100" fill="#9EAEA3" fontSize="9" fontFamily="monospace">17 FEB 2025 · DHAKA</text>
                <text x="40" y="140" fill="#F5F1E7" fontSize="22" fontFamily="sans-serif" fontWeight="bold">55 children.</text>
                <text x="40" y="168" fill="#F5F1E7" fontSize="22" fontFamily="sans-serif" fontWeight="bold">One day.</text>
                <text x="40" y="196" fill="#C8FF3D" fontSize="22" fontFamily="sans-serif" fontWeight="bold">Real change.</text>
              </svg>

              {/* Stat chip */}
              <div
                className="absolute top-4 right-4 px-3 py-2 rounded-xl"
                style={{ backgroundColor: 'var(--color-acid-leaf)' }}
              >
                <span
                  className="font-display font-800 text-2xl block leading-none"
                  style={{ color: 'var(--color-forest-ink)' }}
                >
                  55
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-wider block"
                  style={{ color: 'var(--color-forest-ink)' }}
                >
                  Children
                </span>
              </div>
            </div>

            {/* Partner note */}
            <div
              className="mt-4 px-4 py-3 rounded-xl border flex flex-wrap gap-3"
              style={{ borderColor: 'rgba(158,174,163,0.3)', backgroundColor: 'rgba(158,174,163,0.08)' }}
            >
              <span className="font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>Supported by:</span>
              <span className="font-mono text-xs font-medium" style={{ color: 'var(--color-deep-moss)' }}>Kazi Enterprise</span>
              <span className="font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>&middot;</span>
              <span className="font-mono text-xs font-medium" style={{ color: 'var(--color-deep-moss)' }}>Kaisar Foundation</span>
            </div>
          </motion.div>

          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  backgroundColor: 'var(--color-deep-moss)',
                  color: 'var(--color-acid-leaf)',
                }}
              >
                {story.type}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: 'var(--color-muted-sage)' }}
              >
                {formatDate(story.date)}
              </span>
            </div>

            <h2
              className="font-display font-800 text-display leading-tight tracking-tight mb-6"
              style={{ color: 'var(--color-forest-ink)' }}
            >
              {story.title}
            </h2>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>
                <Calendar size={12} aria-hidden="true" />
                17 February 2025
              </div>
              <div className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>
                <MapPin size={12} aria-hidden="true" />
                Nakhalpara Hossain Ali High School
              </div>
              <div className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>
                <Users size={12} aria-hidden="true" />
                55 children, Classes 1–5
              </div>
            </div>

            <p
              className="text-body-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'var(--color-charcoal)' }}
            >
              {story.excerpt}
            </p>

            {story.pullQuote && (
              <blockquote
                className="border-l-4 pl-5 mb-8 font-serif italic text-xl leading-snug"
                style={{
                  borderColor: 'var(--color-deep-moss)',
                  color: 'var(--color-deep-moss)',
                }}
              >
                &ldquo;{story.pullQuote}&rdquo;
              </blockquote>
            )}

            <Link
              href={`/stories/${story.slug}`}
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider px-6 py-3 rounded-full font-700 transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--color-forest-ink)',
                color: 'var(--color-acid-leaf)',
              }}
            >
              Read the Full Story <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
