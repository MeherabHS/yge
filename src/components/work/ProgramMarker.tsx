import Image from "next/image";
import type { Program } from "@/types";

type ProgramMarkerProps = {
  program: Program;
  index?: number;
};

export default function ProgramMarker({ program, index }: ProgramMarkerProps) {
  const categoryClass = program.category.toLowerCase().replace(/\s+/g, "-");

  if (!program.markerImage) {
    return (
      <span
        className={`program-marker program-marker-fallback marker-${categoryClass}`}
        role="img"
        aria-label={program.markerAlt}
      >
        <strong>
          {typeof index === "number"
            ? String(index + 1).padStart(2, "0")
            : "--"}
        </strong>
        <small>Program</small>
      </span>
    );
  }

  return (
    <span className={`program-marker marker-${categoryClass}`}>
      <Image
        src={program.markerImage}
        alt={program.markerAlt}
        fill
        sizes="(max-width: 560px) 56px, (max-width: 1024px) 64px, 72px"
        className="program-marker-image"
        style={{ objectPosition: program.markerPosition ?? "center" }}
      />
    </span>
  );
}
