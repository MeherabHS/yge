'use client';

import { SearchX } from 'lucide-react';
import type { Program } from '@/types';
import ProgramIndexRow from './ProgramIndexRow';

type ProgramIndexProps = {
  programs: Program[];
  total: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onClear: () => void;
};

export default function ProgramIndex({ programs, total, hasMore, onLoadMore, onClear }: ProgramIndexProps) {
  if (!total) return <div className="program-empty"><SearchX aria-hidden="true" /><h3>No programs match those filters.</h3><p>Try a broader search or clear the active filters.</p><button type="button" onClick={onClear}>Clear filters</button></div>;
  return (
    <div className="program-index">
      <div className="program-index-head" aria-hidden="true"><span>#</span><span>Marker</span><span>Program</span><span>Category</span><span>Year</span><span>Location</span><span>Status</span><span /></div>
      {programs.map((program, index) => <ProgramIndexRow key={program.slug} program={program} index={index} />)}
      {hasMore && <button type="button" className="program-load-more" onClick={onLoadMore}>Load more programs <span aria-hidden="true">↓</span></button>}
    </div>
  );
}
