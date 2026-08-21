"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = ["LEARN", "ORGANIZE", "CREATE", "ADVOCATE", "ACT"];
const MARQUEE_TEXT = WORDS.join(" · ") + " · ";
const REPEATED = Array(8).fill(MARQUEE_TEXT).join("");

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Manifesto"
      className="overflow-hidden relative"
      style={{
        backgroundColor: "var(--color-acid-leaf)",
        color: "var(--color-forest-ink)",
      }}
    >
      {/* Seamless Contained Marquee Strip */}
      <div
        className="py-4 border-b border-black/15 overflow-hidden bg-black/5"
        aria-hidden="true"
      >
        <div className="marquee-track flex whitespace-nowrap">
          <span
            className="font-display font-800 text-3xl sm:text-5xl uppercase tracking-tight pr-6"
            style={{ color: "var(--color-forest-ink)" }}
          >
            {REPEATED}
          </span>
          <span
            className="font-display font-800 text-3xl sm:text-5xl uppercase tracking-tight pr-6"
            style={{ color: "var(--color-forest-ink)" }}
          >
            {REPEATED}
          </span>
        </div>
      </div>

      {/* Manifesto Body - Asymmetric Editorial Spread */}
      <div className="container-yge py-16 sm:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Index & Primary Statement */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-black/20 font-bold bg-black/5">
                01 / Manifesto
              </span>
              <div className="h-px flex-1 bg-black/20" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display font-800 text-display leading-[1.05] tracking-tight"
            >
              Awareness is where change begins.{" "}
              <span className="font-serif italic text-[var(--color-deep-moss)]">
                Action is where it becomes real.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-body-lg leading-relaxed max-w-2xl font-body"
              style={{ color: "var(--color-deep-moss)" }}
            >
              Bangladesh faces acute climate pressures — rising sea levels,
              riverbank erosion, extreme weather, and urban pollution. Youth for
              a Green Earth exists because young Bangladeshis refuse to accept
              environmental destruction as our inevitable future.
            </motion.p>
          </div>

          {/* Right Column: "Why Bangladesh?" Block & Circular Stamp */}
          <div className="lg:col-span-4 space-y-6">
            {/* Circular Stamp Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-36 h-36 rounded-full border-2 border-black/30 bg-black/5 flex flex-col items-center justify-center text-center p-3 font-mono text-[10px] uppercase tracking-widest font-bold leading-tight shadow-md"
            >
              <span>Transforming</span>
              <span className="my-0.5 text-sm text-[var(--color-forest-ink)]">
                &darr;
              </span>
              <span>Awareness</span>
              <span>into Action</span>
            </motion.div>

            {/* Why Bangladesh Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 rounded-2xl border border-black/20 bg-black/5 space-y-2 shadow-sm"
            >
              <h3
                className="font-display font-700 text-lg"
                style={{ color: "var(--color-forest-ink)" }}
              >
                Why Bangladesh?
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-deep-moss)" }}
              >
                As one of the world&apos;s most climate-vulnerable nations,
                Bangladesh is on the frontlines of global ecological change. Our
                youth-led initiatives show how local resilience can inspire
                action worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
