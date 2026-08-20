import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { resources, getResourceBySlug } from '@/content/resources';

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: 'Resource Not Found' };
  return { title: resource.title, description: resource.description };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <div style={{ backgroundColor: 'var(--color-paper-white)' }}>
      {/* Hero */}
      <section className="section-pad pt-32" style={{ backgroundColor: 'var(--color-forest-ink)' }} aria-label={`${resource.title} hero`}>
        <div className="container-yge">
          <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-8 hover:opacity-75" style={{ color: 'var(--color-muted-sage)' }}>
            <ArrowLeft size={14} aria-hidden="true" /> All Resources
          </Link>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(200,255,61,0.15)', color: 'var(--color-acid-leaf)' }}>
                  {resource.type}
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>Published: {resource.publishedDate}</span>
              </div>
              <h1 className="font-display font-800 text-hero leading-tight tracking-tight mb-4" style={{ color: 'var(--color-paper-white)' }}>
                {resource.title}
              </h1>
              <p className="font-mono text-sm mb-6" style={{ color: 'var(--color-electric-teal)' }}>
                Author: {resource.author} {resource.designer && `· Design: ${resource.designer}`}
              </p>
            </div>
            <div className="relative w-full overflow-hidden bg-white/5 shadow-2xl" style={{ aspectRatio: resource.coverAspectRatio ?? '3 / 4' }}>
              <Image src={resource.coverImage} alt={resource.coverAlt} fill priority sizes="(min-width: 1024px) 420px, 88vw" className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-pad">
        <div className="container-yge max-w-3xl">
          <p className="text-body-lg leading-relaxed mb-8" style={{ color: 'var(--color-charcoal)' }}>
            {resource.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {resource.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--color-mist-green)', color: 'var(--color-deep-moss)' }}>
                {tag}
              </span>
            ))}
          </div>

          {resource.pdfPath ? (
            <a
              href={resource.pdfPath}
              download
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider px-6 py-3.5 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--color-acid-leaf)', color: 'var(--color-forest-ink)', fontWeight: 700 }}
            >
              <Download size={16} aria-hidden="true" /> Download Full Document (PDF)
            </a>
          ) : (
            <div
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider px-6 py-3.5 rounded-full cursor-not-allowed"
              style={{ backgroundColor: 'rgba(158,174,163,0.15)', color: 'var(--color-muted-sage)' }}
            >
              <FileText size={16} aria-hidden="true" /> PDF Coming Soon
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
