'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Program } from '@/types';
import WorkFilters from './WorkFilters';
import ProgramIndex from './ProgramIndex';
import ProgramGrid from './ProgramGrid';
import { deriveFilterOptions, filterAndSortPrograms, type ProgramFilters, type WorkSort, type WorkView } from './work-utils';

const filterParamKeys = ['q', 'category', 'year', 'location', 'status'] as const;

export default function WorkArchivePage({ programs }: { programs: Program[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState(8);
  const [visibleCount, setVisibleCount] = useState(8);

  const sortParam = searchParams.get('sort');
  const viewParam = searchParams.get('view');
  const filters: ProgramFilters = useMemo(() => ({
    query: searchParams.get('q') ?? '',
    category: searchParams.get('category') ?? '',
    year: searchParams.get('year') ?? '',
    location: searchParams.get('location') ?? '',
    status: searchParams.get('status') ?? '',
    sort: (['newest', 'oldest', 'title'].includes(sortParam ?? '') ? sortParam : 'newest') as WorkSort,
    view: (['list', 'grid'].includes(viewParam ?? '') ? viewParam : 'list') as WorkView,
  }), [searchParams, sortParam, viewParam]);

  const options = useMemo(() => deriveFilterOptions(programs), [programs]);
  const filteredPrograms = useMemo(() => filterAndSortPrograms(programs, filters), [programs, filters]);
  const visiblePrograms = filteredPrograms.slice(0, visibleCount);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)');
    const update = () => setPageSize(query.matches ? 6 : 8);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [pageSize, filters.query, filters.category, filters.year, filters.location, filters.status, filters.sort, filters.view]);

  const updateFilter = (key: keyof ProgramFilters, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const urlKey = key === 'query' ? 'q' : key;
    const isDefault = (key === 'sort' && value === 'newest') || (key === 'view' && value === 'list');
    if (!value || isDefault) params.delete(urlKey); else params.set(urlKey, value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    filterParamKeys.forEach((key) => params.delete(key));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <section className="work-archive" id="program-archive" aria-labelledby="program-archive-title">
        <div className="work-shell work-archive-intro">
          <div><span className="section-kicker">Program archive</span><h2 id="program-archive-title">Ideas become <em>action</em> here.</h2></div>
          <div><p>Browse YGE’s documented programs across education, advocacy, campus life, community engagement, publishing and creative media.</p><strong>{String(programs.length).padStart(2, '0')}</strong><span>documented programs</span></div>
        </div>
        <WorkFilters filters={filters} options={options} resultCount={filteredPrograms.length} onChange={updateFilter} onClear={clearFilters} />
        <div className="work-shell work-results">
          <p className="work-result-announcement" aria-live="polite">Showing {visiblePrograms.length} of {filteredPrograms.length} matching programs.</p>
          {filters.view === 'list'
            ? <ProgramIndex programs={visiblePrograms} total={filteredPrograms.length} hasMore={visibleCount < filteredPrograms.length} onLoadMore={() => setVisibleCount((count) => count + pageSize)} onClear={clearFilters} />
            : <ProgramGrid programs={visiblePrograms} total={filteredPrograms.length} hasMore={visibleCount < filteredPrograms.length} onLoadMore={() => setVisibleCount((count) => count + pageSize)} onClear={clearFilters} />}
        </div>
    </section>
  );
}
