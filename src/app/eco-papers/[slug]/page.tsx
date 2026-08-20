import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Download, ExternalLink, FileClock } from 'lucide-react';
import { ecoPapers, getEcoPaperBySlug } from '@/content/eco-papers';
import { siteConfig } from '@/content/site';

export function generateStaticParams() { return ecoPapers.map((paper) => ({ slug: paper.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const paper = getEcoPaperBySlug((await params).slug);
  if (!paper) return { title: 'Eco Paper not found' };
  return { title: `${paper.title} — YGE Eco Papers`, description: paper.summary };
}

export default async function EcoPaperDetail({ params }: { params: Promise<{ slug: string }> }) {
  const paper = getEcoPaperBySlug((await params).slug);
  if (!paper) notFound();
  const related = ecoPapers.filter((item) => item.slug !== paper.slug).slice(0, 2);
  const pageUrl = `${siteConfig.url}/eco-papers/${paper.slug}`;
  const citation = `${paper.authors.join(', ')}. (${paper.year ?? 'forthcoming'}). ${paper.title}. Youth for a Green Earth.`;

  return (
    <article className="eco-detail">
      <header className="eco-detail-header">
        <nav aria-label="Breadcrumb"><Link href="/eco-papers"><ArrowLeft /> Eco Papers archive</Link><span>/</span><span>Issue {paper.issueNumber}</span></nav>
        <div className="eco-detail-grid">
          <div className="eco-detail-title"><span className="campaign-label">Issue {paper.issueNumber} / {paper.category}</span><h1>{paper.title}</h1><p>{paper.subtitle}</p><dl><div><dt>Authors</dt><dd>{paper.authors.join(', ')}</dd></div><div><dt>Publication date</dt><dd>{paper.publicationDate ?? 'To be confirmed'}</dd></div><div><dt>Topics</dt><dd>{paper.topics.length ? paper.topics.join(', ') : 'To be confirmed'}</dd></div></dl></div>
          <div className="eco-detail-cover" style={{ aspectRatio: paper.coverAspectRatio ?? '3 / 4' }}><Image src={paper.coverImage} alt={paper.coverAlt} fill priority sizes="(min-width: 1024px) 410px, 78vw" className="object-contain" /></div>
        </div>
      </header>
      <div className="eco-detail-body">
        <section><span className="section-kicker">Executive summary</span><h2>About this issue.</h2><p>{paper.summary}</p>{paper.topics.length > 0 && <ul className="topic-tags">{paper.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>}</section>
        <aside>
          {paper.documentUrl ? <a href={paper.documentUrl} className="lime-button" target="_blank" rel="noreferrer"><Download /> Read or download PDF</a> : <div className="document-pending"><FileClock /><strong>Document coming soon</strong><p>The publication file has not been released. This link will be activated when a verified document is available.</p></div>}
          <div className="share-block"><h2>Share</h2><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer">Facebook <ExternalLink /></a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer">LinkedIn <ExternalLink /></a></div>
        </aside>
        <section className="citation-block"><span className="section-kicker">Citation</span><p>{citation}</p></section>
      </div>
      {related.length > 0 && <section className="related-papers"><div><span className="section-kicker lime">Continue reading</span><h2>Related Eco Papers</h2></div>{related.map((item) => <Link key={item.slug} href={`/eco-papers/${item.slug}`}><span>Issue {item.issueNumber}</span><strong>{item.title}</strong><ArrowRight /></Link>)}</section>}
    </article>
  );
}
