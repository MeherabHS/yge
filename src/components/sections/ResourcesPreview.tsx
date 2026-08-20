'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, ArrowRight } from 'lucide-react';
import { getFeaturedResources } from '@/content/resources';

function ResourceCard({ resource, delay, isInView }: {
  resource: ReturnType<typeof getFeaturedResources>[0];
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group p-6 sm:p-8 rounded-3xl border border-white/10 bg-black/40 transition-all hover:scale-[1.015] hover:border-[var(--color-acid-leaf)] flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Cover image preview */}
        <div
          className="mb-6 relative overflow-hidden flex items-center justify-center border border-white/10 shadow-xl"
          style={{ backgroundColor: 'var(--color-deep-moss)', aspectRatio: resource.coverAspectRatio ?? '3 / 4' }}
        >
          <Image
            src={resource.coverImage}
            alt={resource.coverAlt}
            fill
            sizes="(min-width: 768px) 420px, 92vw"
            className="object-contain"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold"
            style={{ backgroundColor: 'rgba(0,221,179,0.15)', color: 'var(--color-electric-teal)' }}
          >
            {resource.type}
          </span>
          <span className="font-mono text-xs text-[var(--color-muted-sage)]">
            {resource.publishedDate}
          </span>
        </div>

        <h3
          className="font-display font-800 text-2xl leading-tight tracking-tight text-[var(--color-paper-white)]"
        >
          {resource.title}
        </h3>
        <p className="font-mono text-xs text-[var(--color-muted-sage)]">
          By {resource.author}
          {resource.designer && <> &middot; Design: {resource.designer}</>}
        </p>
        <p className="text-sm leading-relaxed text-white/80 font-body line-clamp-3">
          {resource.description}
        </p>
      </div>

      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--color-acid-leaf)]/10 text-[var(--color-acid-leaf)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {resource.pdfPath ? (
          <a
            href={resource.pdfPath}
            download
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all hover:scale-105 font-700 w-full justify-center"
            style={{ backgroundColor: 'var(--color-acid-leaf)', color: 'var(--color-forest-ink)' }}
            aria-label={`Download ${resource.title} PDF`}
          >
            <Download size={14} aria-hidden="true" /> Download PDF
          </a>
        ) : (
          <div
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-full cursor-not-allowed opacity-60 w-full justify-center border border-white/10"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--color-muted-sage)' }}
            aria-label="PDF not yet available"
          >
            <FileText size={14} aria-hidden="true" /> PDF Coming Soon
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function ResourcesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const resources = getFeaturedResources();

  return (
    <section
      ref={ref}
      aria-label="Featured resources"
      className="section-pad"
      style={{ backgroundColor: 'var(--color-forest-ink)', color: 'var(--color-paper-white)' }}
    >
      <div className="container-yge">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-electric-teal)] block mb-2 font-bold">
              Publications Library
            </span>
            <h2 className="font-display font-800 text-display leading-tight tracking-tight text-[var(--color-paper-white)]">
              Open{' '}
              <em className="font-serif italic" style={{ color: 'var(--color-electric-teal)' }}>Resources</em>
            </h2>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider animated-link self-start font-bold text-[var(--color-paper-white)]"
          >
            All Resources <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          {resources.map((r, i) => (
            <ResourceCard key={r.slug} resource={r} delay={i * 0.15} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
