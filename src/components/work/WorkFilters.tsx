"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Grid3X3, List, Search, SlidersHorizontal, X } from "lucide-react";
import ActiveFilterChips from "./ActiveFilterChips";
import type {
  FilterOptions,
  ProgramFilters,
  WorkSort,
  WorkView,
} from "./work-utils";

type FilterKey = "query" | "category" | "year" | "location" | "status";

type WorkFiltersProps = {
  filters: ProgramFilters;
  options: FilterOptions;
  resultCount: number;
  onChange: (key: keyof ProgramFilters, value: string) => void;
  onClear: () => void;
};

function FilterControls({
  filters,
  options,
  onChange,
  idPrefix,
}: WorkFiltersProps & { idPrefix: string }) {
  return (
    <div className="work-filter-controls">
      <label className="work-search" htmlFor={`${idPrefix}-search`}>
        <span>Search programs</span>
        <Search aria-hidden="true" />
        <input
          id={`${idPrefix}-search`}
          type="search"
          value={filters.query}
          onChange={(event) => onChange("query", event.target.value)}
          placeholder="Search programs"
        />
      </label>
      <label htmlFor={`${idPrefix}-category`}>
        <span>Category</span>
        <select
          id={`${idPrefix}-category`}
          value={filters.category}
          onChange={(event) => onChange("category", event.target.value)}
        >
          <option value="">All categories</option>
          {options.categories.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label htmlFor={`${idPrefix}-year`}>
        <span>Year</span>
        <select
          id={`${idPrefix}-year`}
          value={filters.year}
          onChange={(event) => onChange("year", event.target.value)}
        >
          <option value="">All years</option>
          {options.years.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label htmlFor={`${idPrefix}-location`}>
        <span>Location</span>
        <select
          id={`${idPrefix}-location`}
          value={filters.location}
          onChange={(event) => onChange("location", event.target.value)}
        >
          <option value="">All locations</option>
          {options.locations.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label htmlFor={`${idPrefix}-status`}>
        <span>Status</span>
        <select
          id={`${idPrefix}-status`}
          value={filters.status}
          onChange={(event) => onChange("status", event.target.value)}
        >
          <option value="">All status</option>
          {options.statuses.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label htmlFor={`${idPrefix}-sort`}>
        <span>Sort</span>
        <select
          id={`${idPrefix}-sort`}
          value={filters.sort}
          onChange={(event) => onChange("sort", event.target.value as WorkSort)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
      </label>
    </div>
  );
}

export default function WorkFilters(props: WorkFiltersProps) {
  const { filters, resultCount, onChange, onClear } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const id = useId().replace(/:/g, "");
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    window.requestAnimationFrame(() => openButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  const removeFilter = (key: FilterKey) => onChange(key, "");
  return (
    <div className="work-filter-region">
      <div className="work-filter-bar">
        <div className="work-shell work-filter-desktop">
          <FilterControls {...props} idPrefix={`${id}-desktop`} />
          <div className="work-view-toggle" aria-label="Program view">
            <button
              type="button"
              aria-pressed={filters.view === "list"}
              onClick={() => onChange("view", "list" satisfies WorkView)}
            >
              <List aria-hidden="true" /> List
            </button>
            <button
              type="button"
              aria-pressed={filters.view === "grid"}
              onClick={() => onChange("view", "grid" satisfies WorkView)}
            >
              <Grid3X3 aria-hidden="true" /> Grid
            </button>
          </div>
        </div>
        <div className="work-shell work-filter-mobile">
          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="work-filter-drawer"
          >
            <SlidersHorizontal aria-hidden="true" /> Filters
          </button>
          <span>
            {resultCount} result{resultCount === 1 ? "" : "s"}
          </span>
          <div className="work-view-toggle" aria-label="Program view">
            <button
              type="button"
              aria-label="List view"
              aria-pressed={filters.view === "list"}
              onClick={() => onChange("view", "list")}
            >
              <List aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={filters.view === "grid"}
              onClick={() => onChange("view", "grid")}
            >
              <Grid3X3 aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="work-shell">
        <ActiveFilterChips
          filters={filters}
          onRemove={removeFilter}
          onClear={onClear}
        />
      </div>
      {drawerOpen && (
        <div
          className="work-filter-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDrawer();
          }}
        >
          <section
            id="work-filter-drawer"
            className="work-filter-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-filter-title"
          >
            <header>
              <h2 id="work-filter-title">Filter programs</h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Close filters"
              >
                <X aria-hidden="true" />
              </button>
            </header>
            <FilterControls {...props} idPrefix={`${id}-mobile`} />
            <footer>
              <button type="button" onClick={onClear}>
                Clear filters
              </button>
              <button type="button" onClick={closeDrawer}>
                Show {resultCount} result{resultCount === 1 ? "" : "s"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
