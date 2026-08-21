import Image from "next/image";
import { Leaf } from "lucide-react";

export function PaperTexture({ className = "" }: { className?: string }) {
  return <span className={`paper-texture ${className}`} aria-hidden="true" />;
}

export function TornPaperEdge({
  position = "bottom",
}: {
  position?: "top" | "bottom";
}) {
  return (
    <span
      className={`torn-paper-edge torn-paper-${position}`}
      aria-hidden="true"
    />
  );
}

export function TapeStrip({ className = "" }: { className?: string }) {
  return <span className={`tape-strip ${className}`} aria-hidden="true" />;
}

export function HalftonePattern({ className = "" }: { className?: string }) {
  return (
    <span className={`halftone-pattern ${className}`} aria-hidden="true" />
  );
}

export function CampaignStamp({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`about-campaign-stamp ${dark ? "stamp-dark" : ""} ${className}`}
      aria-hidden="true"
    >
      <span className="font-bengali">সবুজ পৃথিবীর জন্য</span>
      <Leaf />
      <span className="font-bengali">আমরাই গড়ি</span>
    </span>
  );
}

export function RiverContour({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`about-river-contour ${className}`}
      viewBox="0 0 500 300"
      aria-hidden="true"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <path
          key={index}
          d={`M-30 ${72 + index * 20}C88 ${14 + index * 18} 138 ${148 + index * 10} 245 ${76 + index * 19}S410 ${42 + index * 19} 540 ${104 + index * 16}`}
        />
      ))}
    </svg>
  );
}

export function HandDrawnArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hand-arrow ${className}`}
      viewBox="0 0 86 70"
      aria-hidden="true"
    >
      <path d="M7 63c4-25 18-52 45-47 20 4 15 25 2 21-10-3 5-20 26-27M69 4l12 6-8 10" />
    </svg>
  );
}

export function DeltaCollage({ src }: { src: string }) {
  return (
    <div className="delta-collage">
      <Image
        src={src}
        alt="Archival collage of the Bangladesh delta and a traditional riverboat"
        fill
        priority
        sizes="(max-width: 700px) 100vw, 56vw"
      />
    </div>
  );
}
