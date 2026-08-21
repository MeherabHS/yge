"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Film } from "lucide-react";

const documentaries = [
  {
    id: "buriganga",
    title: "Buriganga: Dying Before Our Eyes",
    year: "2024",
    duration: "Short Documentary",
    description:
      "The Buriganga River once defined Dhaka. Today it carries the weight of unchecked urban growth. This film follows communities whose lives are shaped by a river under extreme stress.",
    posterBg: "linear-gradient(135deg, #071A14 0%, #123C2F 100%)",
    accentColor: "var(--color-electric-teal)",
    theme: "River · Pollution · Dhaka",
  },
  {
    id: "echoes",
    title: "Echoes of Survival: The Climate Refugees of Kamlapur",
    year: "2024",
    duration: "Short Documentary",
    description:
      "Behind the statistics of climate displacement are real human lives. This documentary enters the lives of families displaced by flooding in Kamlapur.",
    posterBg: "linear-gradient(135deg, #123C2F 0%, #161D19 100%)",
    accentColor: "var(--color-solar-yellow)",
    theme: "Displacement · Resilience · Kamlapur",
  },
  {
    id: "breathing",
    title:
      "Breathing Life Back Into Bangladesh: Let's Clear the Skies Together",
    year: "2024",
    duration: "Short Documentary",
    description:
      "Dhaka's air quality is among the worst in Asia. This film explores the root causes, the health impacts, and the young people determined to breathe easier.",
    posterBg: "linear-gradient(135deg, #161D19 0%, #8E6CFF 30%, #071A14 100%)",
    accentColor: "var(--color-future-violet)",
    theme: "Air Quality · Urban · Youth",
  },
];

function DocPoster({
  doc,
  delay,
  isInView,
}: {
  doc: (typeof documentaries)[0];
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="group"
    >
      {/* Poster Thumbnail */}
      <div
        className="aspect-[3/4] rounded-3xl relative overflow-hidden mb-6 cursor-pointer border border-white/15 shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-[var(--color-acid-leaf)]"
        style={{ background: doc.posterBg }}
        role="img"
        aria-label={`Documentary poster: ${doc.title}`}
      >
        {/* Content on Poster */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 text-white/80 border border-white/10">
              YGE Documentary
            </span>
            <span className="font-mono text-xs font-bold text-[var(--color-acid-leaf)]">
              {doc.year}
            </span>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-acid-leaf)]">
              {doc.theme}
            </p>
            <h4 className="font-display font-800 text-2xl text-[var(--color-paper-white)] leading-tight">
              {doc.title}
            </h4>
          </div>
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center pl-1 shadow-2xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: "var(--color-acid-leaf)" }}
          >
            <Play
              size={26}
              fill="var(--color-forest-ink)"
              color="var(--color-forest-ink)"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <h3 className="font-display font-700 text-xl leading-tight tracking-tight mb-2 text-[var(--color-paper-white)] group-hover:text-[var(--color-acid-leaf)] transition-colors">
        {doc.title}
      </h3>
      <p className="font-mono text-xs mb-3 text-[var(--color-muted-sage)]">
        {doc.duration}
      </p>
      <p className="text-sm font-body leading-relaxed text-white/80">
        {doc.description}
      </p>
    </motion.article>
  );
}

export default function DocumentarySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="YGE documentary films"
      className="section-pad"
      style={{ backgroundColor: "#0D0D12", color: "var(--color-paper-white)" }}
    >
      <div className="container-yge">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[var(--color-future-violet)]/20 border border-[var(--color-future-violet)] text-[var(--color-future-violet)] mb-3">
              <Film size={14} /> Creative Climate Media
            </div>
            <h2 className="font-display font-800 text-display leading-tight tracking-tight text-[var(--color-paper-white)]">
              Environmental{" "}
              <em
                className="font-serif italic"
                style={{ color: "var(--color-future-violet)" }}
              >
                Documentaries
              </em>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-mono text-[var(--color-muted-sage)]">
            Three films. Three dimensions of Bangladesh&apos;s environmental
            reality.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentaries.map((doc, i) => (
            <DocPoster
              key={doc.id}
              doc={doc}
              delay={i * 0.15}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
