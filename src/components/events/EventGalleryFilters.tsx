"use client";

import type { EventGalleryCategory } from "@/content/event-gallery";

interface EventGalleryFiltersProps {
  active: "all" | EventGalleryCategory;
  onChange: (category: "all" | EventGalleryCategory) => void;
  categories: Array<{ value: "all" | EventGalleryCategory; label: string }>;
}

export default function EventGalleryFilters({
  active,
  onChange,
  categories,
}: EventGalleryFiltersProps) {
  return (
    <div className="event-gallery-filters" aria-label="Filter event gallery">
      {categories.map((category) => (
        <button
          type="button"
          key={category.value}
          className={active === category.value ? "active" : ""}
          aria-pressed={active === category.value}
          onClick={() => onChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
