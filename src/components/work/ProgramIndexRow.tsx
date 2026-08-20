'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Program } from '@/types';
import { programYear } from './work-utils';
import ProgramMarker from './ProgramMarker';

export default function ProgramIndexRow({ program, index }: { program: Program; index: number }) {
  return (
    <article className={`program-index-row ${index % 2 ? 'index-tone-dark' : 'index-tone-paper'}`}>
      <span className="program-index-number">{String(index + 1).padStart(2, '0')}</span>
      <ProgramMarker program={program} index={index} />
      <h3><Link href={`/work/${program.slug}`}>{program.title}</Link></h3>
      <span className="program-index-category">{program.category}</span>
      <span>{programYear(program)}</span>
      <span className="program-index-location">{program.location}</span>
      <span className={`program-status status-${program.status.toLowerCase()}`}>{program.status}</span>
      <Link href={`/work/${program.slug}`} className="program-index-arrow" aria-label={`View ${program.title}`}><ArrowRight aria-hidden="true" /></Link>
    </article>
  );
}
