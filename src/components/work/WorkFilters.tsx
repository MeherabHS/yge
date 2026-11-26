"use client";

import { useId, useState } from "react";
import { Grid3X3, List, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

// Radix Select items cannot use an empty value, so "All" maps to a sentinel.
const ALL = "__all";

function FilterSelect({
  id,
  label,
  allLabel,
  value,
  values,
  onChange,
}: {
  id: string;
  label: string;
  allLabel: string;
  value: string;
  values: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id}>
      <span>{label}</span>
      <Select
        value={value || ALL}
        onValueChange={(next) => onChange(next === ALL ? "" : next)}
      >
        <SelectTrigger id={id} aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{allLabel}</SelectItem>
          {values.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

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
        <Input
          id={`${idPrefix}-search`}
          type="search"
          value={filters.query}
          onChange={(event) => onChange("query", event.target.value)}
          placeholder="Search programs"
        />
      </label>
      <FilterSelect
        id={`${idPrefix}-category`}
        label="Category"
        allLabel="All categories"
        value={filters.category}
        values={options.categories}
        onChange={(value) => onChange("category", value)}
      />
      <FilterSelect
        id={`${idPrefix}-year`}
        label="Year"
        allLabel="All years"
        value={filters.year}
        values={options.years}
        onChange={(value) => onChange("year", value)}
      />
      <FilterSelect
        id={`${idPrefix}-location`}
        label="Location"
        allLabel="All locations"
        value={filters.location}
        values={options.locations}
        onChange={(value) => onChange("location", value)}
      />
      <FilterSelect
        id={`${idPrefix}-status`}
        label="Status"
        allLabel="All status"
        value={filters.status}
        values={options.statuses}
        onChange={(value) => onChange("status", value)}
      />
      <label htmlFor={`${idPrefix}-sort`}>
        <span>Sort</span>
        <Select
          value={filters.sort}
          onValueChange={(value) => onChange("sort", value as WorkSort)}
        >
          <SelectTrigger id={`${idPrefix}-sort`} aria-label="Sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="title">Title A–Z</SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  );
}

function ViewToggle({
  view,
  onChange,
  compact = false,
}: {
  view: WorkView;
  onChange: (key: keyof ProgramFilters, value: string) => void;
  compact?: boolean;
}) {
  return (
    <ToggleGroup
      type="single"
      className="work-view-toggle"
      aria-label="Program view"
      value={view}
      // Ignore deselection so one view is always active.
      onValueChange={(value) => value && onChange("view", value)}
    >
      <ToggleGroupItem value="list" aria-label="List view">
        <List aria-hidden="true" /> {!compact && "List"}
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid3X3 aria-hidden="true" /> {!compact && "Grid"}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default function WorkFilters(props: WorkFiltersProps) {
  const { filters, resultCount, onChange, onClear } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const id = useId().replace(/:/g, "");
  const results = `${resultCount} result${resultCount === 1 ? "" : "s"}`;

  const removeFilter = (key: FilterKey) => onChange(key, "");
  return (
    <div className="work-filter-region">
      <div className="work-filter-bar">
        <div className="work-shell work-filter-desktop">
          <FilterControls {...props} idPrefix={`${id}-desktop`} />
          <ViewToggle view={filters.view} onChange={onChange} />
        </div>
        <div className="work-shell work-filter-mobile">
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <button type="button">
                <SlidersHorizontal aria-hidden="true" /> Filters
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="work-filter-drawer"
              aria-describedby={undefined}
            >
              <header>
                <SheetTitle asChild>
                  <h2>Filter programs</h2>
                </SheetTitle>
                <SheetClose asChild>
                  <button type="button" aria-label="Close filters">
                    <X aria-hidden="true" />
                  </button>
                </SheetClose>
              </header>
              <FilterControls {...props} idPrefix={`${id}-mobile`} />
              <footer>
                <button type="button" onClick={onClear}>
                  Clear filters
                </button>
                <SheetClose asChild>
                  <button type="button">Show {results}</button>
                </SheetClose>
              </footer>
            </SheetContent>
          </Sheet>
          <span aria-live="polite">{results}</span>
          <ViewToggle view={filters.view} onChange={onChange} compact />
        </div>
      </div>
      <div className="work-shell">
        <ActiveFilterChips
          filters={filters}
          onRemove={removeFilter}
          onClear={onClear}
        />
      </div>
    </div>
  );
}
