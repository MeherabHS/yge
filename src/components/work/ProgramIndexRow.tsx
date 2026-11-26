"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/types";
import { programStoryHref, programYear } from "./work-utils";
import ProgramMarker from "./ProgramMarker";

export default function ProgramIndexRow({
  program,
  index,
}: {
  program: Program;
  index: number;
}) {
  const storyHref = programStoryHref(program);
  return (
    <article
      className={`program-index-row ${index % 2 ? "index-tone-dark" : "index-tone-paper"}`}
    >
      <span className="program-index-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <ProgramMarker program={program} index={index} />
      <h3>
        {storyHref ? (
          <Link href={storyHref}>{program.title}</Link>
        ) : (
          program.title
        )}
      </h3>
      <span className="program-index-category">{program.category}</span>
      <span>{programYear(program)}</span>
      <span className="program-index-location">{program.location}</span>
      <span className={`program-status status-${program.status.toLowerCase()}`}>
        {program.status}
      </span>
      {storyHref ? (
        <Link
          href={storyHref}
          className="program-index-arrow"
          aria-label={`Read the story of ${program.title}`}
        >
          <ArrowRight aria-hidden="true" />
        </Link>
      ) : (
        <span className="program-index-arrow" aria-hidden="true" />
      )}
    </article>
  );
}
