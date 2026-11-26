"use client";

import type { EventGalleryCategory } from "@/content/event-gallery";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type FilterValue = "all" | EventGalleryCategory;

interface EventGalleryFiltersProps {
  active: FilterValue;
  onChange: (category: FilterValue) => void;
  categories: Array<{ value: FilterValue; label: string }>;
}

export default function EventGalleryFilters({
  active,
  onChange,
  categories,
}: EventGalleryFiltersProps) {
  return (
    <ToggleGroup
      type="single"
      className="event-gallery-filters"
      aria-label="Filter photos"
      value={active}
      // Ignore deselection so one filter is always active.
      onValueChange={(value) => value && onChange(value as FilterValue)}
    >
      {categories.map((category) => (
        <ToggleGroupItem key={category.value} value={category.value}>
          {category.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
