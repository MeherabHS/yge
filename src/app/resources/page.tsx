'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Download, FileText, ArrowRight, BookOpen } from 'lucide-react';
import { resources } from '@/content/resources';

export default function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('All');

  const types = ['All', ...Array.from(new Set(resources.map((r) => r.type)))];

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchType = activeType === 'All' || r.type === activeType;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchType && matchQuery;
    });
  }, [query, activeType]);

  return (
    <div style={{ backgroundColor: 'var(--color-warm-cream)', color: 'var(--color-forest-ink)' }}>
      {/* Editorial Hero */}
      <section className="section-pad pt-36 pb-16 grain" style={{ backgroundColor: 'var(--color-future-violet)', color: 'var(--color-paper-white)' }}>
        <div className="container-yge max-w-4xl">
          <span
            className="font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-6 font-bold"
            style={{ backgroundColor: 'var(--color-acid-leaf)', color: 'var(--color-forest-ink)' }}
          >
            Open Knowledge Library
          </span>
          <h1 className="font-display font-800 text-hero leading-[0.98] tracking-tight mb-6">
            Environmental <em className="font-serif italic" style={{ color: 'var(--color-acid-leaf)' }}>resources.</em>
          </h1>
          <p className="text-body-lg text-white/80 max-w-2xl leading-relaxed">
            Toolkits, educational materials, field reports and open publications produced by Youth for a Green Earth.
          </p>
        </div>
      </section>

      {/* Featured Eco Papers Feature Banner */}
      <div className="py-8 border-b border-black/10" style={{ backgroundColor: 'var(--color-forest-ink)', color: 'var(--color-paper-white)' }}>
        <div className="container-yge flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-acid-leaf)] text-[var(--color-forest-ink)]">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="font-display font-700 text-xl text-[var(--color-paper-white)]">Looking for YGE Eco Papers?</h3>
              <p className="font-mono text-xs text-[var(--color-muted-sage)]">Explore our dedicated publication series &amp; issue archives.</p>
            </div>
          </div>
          <Link
            href="/eco-papers"
            className="font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-full font-700 transition-all hover:scale-105 inline-flex items-center gap-2"
            style={{ backgroundColor: 'var(--color-acid-leaf)', color: 'var(--color-forest-ink)' }}
          >
            Visit Eco Papers Portal <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="py-8 border-b border-black/10">
        <div className="container-yge flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-sage)]" />
            <input
              type="search"
              placeholder="Search toolkits, reports, materials..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-black/20 font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-future-violet)]"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className="min-h-11 font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all"
                style={{
                  borderColor: activeType === type ? 'var(--color-future-violet)' : 'rgba(18,60,47,0.2)',
                  backgroundColor: activeType === type ? 'var(--color-future-violet)' : 'transparent',
                  color: activeType === type ? 'var(--color-paper-white)' : 'var(--color-forest-ink)',
                  fontWeight: activeType === type ? 700 : 500,
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-pad" aria-label="Resource Archive">
        <div className="container-yge">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <article
                key={r.slug}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white flex flex-col justify-between transition-all hover:shadow-xl"
              >
                <Link
                  href={`/resources/${r.slug}`}
                  className="relative block w-full bg-[var(--color-forest-ink)]"
                  style={{ aspectRatio: r.coverAspectRatio ?? '3 / 4' }}
                >
                  <Image src={r.coverImage} alt={r.coverAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" className="object-contain" />
                </Link>
                <div className="space-y-4 p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-future-violet)]/10 text-[var(--color-future-violet)] font-bold">
                      {r.type}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-muted-sage)]">{r.publishedDate}</span>
                  </div>

                  <h2 className="font-display font-800 text-2xl text-[var(--color-forest-ink)]">{r.title}</h2>
                  <p className="font-mono text-xs text-[var(--color-muted-sage)]">Author: {r.author}</p>
                  <p className="text-sm font-body leading-relaxed text-[var(--color-charcoal)]">{r.description}</p>
                </div>

                <div className="space-y-4 mx-8 mb-8 pt-4 border-t border-black/10">
                  {r.pdfPath ? (
                    <a
                      href={r.pdfPath}
                      download
                      className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-full font-700 w-full transition-all hover:scale-105"
                      style={{ backgroundColor: 'var(--color-future-violet)', color: 'var(--color-paper-white)' }}
                    >
                      <Download size={14} /> Download PDF
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-full w-full cursor-not-allowed opacity-60 border border-black/10"
                    >
                      <FileText size={14} /> PDF Coming Soon
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
