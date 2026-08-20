import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { programs, getProgramBySlug } from '@/content/programs';
import { getPartnerBySlug } from '@/content/partners';

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: 'Program Not Found' };
  return { title: program.title, description: program.summary };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const partners = program.partnerSlugs.map(getPartnerBySlug).filter(Boolean);

  return (
    <div style={{ backgroundColor: 'var(--color-paper-white)' }}>
      {/* Hero */}
      <section className="section-pad pt-32" style={{ backgroundColor: 'var(--color-forest-ink)' }} aria-label={`${program.title} hero`}>
        <div className="container-yge">
          <Link href="/work" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-8 hover:opacity-75 transition-opacity" style={{ color: 'var(--color-muted-sage)' }}>
            <ArrowLeft size={14} aria-hidden="true" /> All Programs
          </Link>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(200,255,61,0.15)', color: 'var(--color-acid-leaf)' }}>
                {program.category}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>{program.status}</span>
            </div>
            <h1 className="font-display font-800 text-hero leading-tight tracking-tight mb-6" style={{ color: 'var(--color-paper-white)' }}>
              {program.title}
            </h1>
            <p className="font-serif italic text-subhead mb-8" style={{ color: 'var(--color-electric-teal)' }}>
              {program.tagline}
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>
                <Calendar size={12} aria-hidden="true" /> {program.date}
              </div>
              <div className="flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>
                <MapPin size={12} aria-hidden="true" /> {program.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="section-pad">
        <div className="container-yge">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-muted-sage)' }}>Overview</p>
                <p className="text-body-lg leading-relaxed" style={{ color: 'var(--color-charcoal)' }}>{program.summary}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-muted-sage)' }}>The Challenge</p>
                <p className="text-body-lg leading-relaxed" style={{ color: 'var(--color-charcoal)' }}>{program.problem}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-muted-sage)' }}>YGE&apos;s Response</p>
                <p className="text-body-lg leading-relaxed" style={{ color: 'var(--color-charcoal)' }}>{program.response}</p>
              </div>
              {program.activities.length > 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted-sage)' }}>Activities</p>
                  <ul className="space-y-2" role="list">
                    {program.activities.map((act) => (
                      <li key={act} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-electric-teal)' }} aria-hidden="true" />
                        <span className="text-sm" style={{ color: 'var(--color-charcoal)' }}>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {program.outputs.length > 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted-sage)' }}>Documented Outputs</p>
                  <ul className="space-y-2" role="list">
                    {program.outputs.map((out) => (
                      <li key={out} className="flex items-start gap-3">
                        <span className="font-mono text-xs" style={{ color: 'var(--color-acid-leaf)' }}>&#9632;</span>
                        <span className="text-sm" style={{ color: 'var(--color-charcoal)' }}>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {partners.length > 0 && (
                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-mist-green)' }}>
                  <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted-sage)' }}>Partners</p>
                  <div className="space-y-3">
                    {partners.map((p) => p && (
                      <div key={p.slug}>
                        <p className="font-display font-600 text-sm" style={{ color: 'var(--color-forest-ink)' }}>{p.name}</p>
                        <p className="font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>{p.relationship}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-forest-ink)' }}>
                <p className="font-display font-700 text-base mb-4" style={{ color: 'var(--color-warm-cream)' }}>{program.cta.label}</p>
                <Link
                  href={program.cta.href}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-acid-leaf)', color: 'var(--color-forest-ink)', fontWeight: 700 }}
                >
                  Take Action
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
