'use client';

import { X } from 'lucide-react';
import type { ProgramFilters } from './work-utils';

type FilterKey = 'query' | 'category' | 'year' | 'location' | 'status';

export default function ActiveFilterChips({ filters, onRemove, onClear }: { filters: ProgramFilters; onRemove: (key: FilterKey) => void; onClear: () => void }) {
  const chips: { key: FilterKey; label: string }[] = [
    filters.query ? { key: 'query', label: `Search: ${filters.query}` } : null,
    filters.category ? { key: 'category', label: filters.category } : null,
    filters.year ? { key: 'year', label: filters.year } : null,
    filters.location ? { key: 'location', label: filters.location } : null,
    filters.status ? { key: 'status', label: filters.status } : null,
  ].filter((chip): chip is { key: FilterKey; label: string } => Boolean(chip));

  if (!chips.length) return null;
  return (
    <div className="active-filter-chips" aria-label="Active filters">
      {chips.map((chip) => (
        <button key={chip.key} type="button" onClick={() => onRemove(chip.key)}>
          {chip.label}<X aria-hidden="true" />
          <span className="sr-only">Remove {chip.label} filter</span>
        </button>
      ))}
      <button type="button" className="clear-filter-chip" onClick={onClear}>Clear all</button>
    </div>
  );
}
