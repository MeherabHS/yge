import type { Program, ProgramCategory, ProgramStatus } from "@/types";

export type WorkView = "list" | "grid";
export type WorkSort = "newest" | "oldest" | "title";

export type ProgramFilters = {
  query: string;
  category: string;
  year: string;
  location: string;
  status: string;
  sort: WorkSort;
  view: WorkView;
};

export type FilterOptions = {
  categories: ProgramCategory[];
  years: string[];
  locations: string[];
  statuses: ProgramStatus[];
};

export function programYear(program: Program): string {
  return program.date.match(/\d{4}/)?.[0] ?? "Undated";
}

export function deriveFilterOptions(programs: Program[]): FilterOptions {
  return {
    categories: [
      ...new Set(programs.map((program) => program.category)),
    ].sort(),
    years: [...new Set(programs.map(programYear))].sort((a, b) =>
      b.localeCompare(a),
    ),
    locations: [...new Set(programs.map((program) => program.location))].sort(),
    statuses: [...new Set(programs.map((program) => program.status))].sort(),
  };
}

export function filterAndSortPrograms(
  programs: Program[],
  filters: ProgramFilters,
): Program[] {
  const query = filters.query.trim().toLocaleLowerCase();
  const filtered = programs.filter((program) => {
    const matchesQuery =
      !query ||
      [
        program.title,
        program.shortTitle,
        program.summary,
        program.category,
        program.location,
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query);
    return (
      matchesQuery &&
      (!filters.category || program.category === filters.category) &&
      (!filters.year || programYear(program) === filters.year) &&
      (!filters.location || program.location === filters.location) &&
      (!filters.status || program.status === filters.status)
    );
  });

  return filtered.sort((a, b) => {
    if (filters.sort === "title") return a.title.localeCompare(b.title);
    const aYear = Number(programYear(a)) || 0;
    const bYear = Number(programYear(b)) || 0;
    return filters.sort === "oldest" ? aYear - bYear : bYear - aYear;
  });
}
