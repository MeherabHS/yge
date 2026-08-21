import { describe, expect, it } from "vitest";
import type { Program } from "@/types";
import {
  deriveFilterOptions,
  filterAndSortPrograms,
  programYear,
} from "./work-utils";

const programs = [
  {
    title: "River Action",
    shortTitle: "River",
    summary: "Community cleanup",
    category: "Community",
    location: "Dhaka",
    status: "Completed",
    date: "May 2024",
  },
  {
    title: "Campus Future",
    shortTitle: "Campus",
    summary: "Climate education",
    category: "Education",
    location: "Chattogram",
    status: "Active",
    date: "2026",
  },
] as Program[];

describe("work archive utilities", () => {
  it("derives stable filter options and years", () => {
    expect(programYear(programs[0])).toBe("2024");
    expect(deriveFilterOptions(programs)).toMatchObject({
      years: ["2026", "2024"],
      locations: ["Chattogram", "Dhaka"],
    });
  });

  it("filters search text and sorts without mutating the source array", () => {
    const original = [...programs];
    const result = filterAndSortPrograms(programs, {
      query: "climate",
      category: "",
      year: "",
      location: "",
      status: "",
      sort: "newest",
      view: "list",
    });
    expect(result.map((program) => program.title)).toEqual(["Campus Future"]);
    expect(programs).toEqual(original);
  });
});
