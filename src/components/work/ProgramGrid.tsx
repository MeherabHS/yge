'use client';

import Link from 'next/link';
import { ArrowRight, SearchX } from 'lucide-react';
import type { Program } from '@/types';
import ProgramMarker from './ProgramMarker';
import { programYear } from './work-utils';

function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <article className="program-grid-card">
      <div className="program-grid-marker"><ProgramMarker program={program} index={index} /><span>{program.category}</span></div>
      <div><span className={`program-status status-${program.status.toLowerCase()}`}>{program.status}</span><h3><Link href={`/work/${program.slug}`}>{program.title}</Link></h3><p>{program.summary}</p></div>
      <footer><span>{programYear(program)} · {program.location}</span><Link href={`/work/${program.slug}`} aria-label={`View ${program.title}`}><ArrowRight aria-hidden="true" /></Link></footer>
    </article>
  );
}

export default function ProgramGrid({ programs, total, hasMore, onLoadMore, onClear }: { programs: Program[]; total: number; hasMore: boolean; onLoadMore: () => void; onClear: () => void }) {
  if (!total) return <div className="program-empty"><SearchX aria-hidden="true" /><h3>No programs match those filters.</h3><p>Try a broader search or clear the active filters.</p><button type="button" onClick={onClear}>Clear filters</button></div>;
  return <><div className="program-grid">{programs.map((program, index) => <ProgramCard key={program.slug} program={program} index={index} />)}</div>{hasMore && <button type="button" className="program-load-more" onClick={onLoadMore}>Load more programs <span aria-hidden="true">↓</span></button>}</>;
}
