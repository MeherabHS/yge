"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { impactLocations } from "@/content/impact";

export default function BangladeshMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Bangladesh activity map"
      className="section-pad"
      style={{ backgroundColor: "var(--color-charcoal)" }}
    >
      <div className="container-yge">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[var(--color-electric-teal)]/30 text-[var(--color-electric-teal)]">
              <Navigation size={13} /> Geographic Presence
            </div>

            <h2 className="font-display font-800 text-display leading-tight tracking-tight text-[var(--color-paper-white)]">
              Across{" "}
              <em
                className="font-serif italic"
                style={{ color: "var(--color-electric-teal)" }}
              >
                Bangladesh
              </em>
            </h2>

            <p className="text-body-lg leading-relaxed text-[var(--color-muted-sage)] font-body">
              From Dhaka&apos;s urban communities to the tea hills of Sreemangal
              and the ecosystems of Khagrachari — YGE takes environmental action
              where it matters most.
            </p>

            {/* Location Cards */}
            <div className="space-y-3 pt-2">
              {impactLocations.map((loc, i) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-black/30"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 animate-pulse"
                    style={{ backgroundColor: "var(--color-electric-teal)" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display font-700 text-base text-[var(--color-paper-white)]">
                      {loc.name}
                    </p>
                    <p className="font-mono text-xs text-[var(--color-muted-sage)] mb-2">
                      {loc.region}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.activities.map((act) => (
                        <span
                          key={act}
                          className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--color-acid-leaf)]/10 text-[var(--color-acid-leaf)]"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual Tactical Map Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-md p-8 rounded-3xl border border-white/15 bg-black/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-electric-teal)] font-bold">
                  YGE Activity Locations
                </span>
                <span className="font-mono text-[10px] text-[var(--color-muted-sage)]">
                  3 Regions Verified
                </span>
              </div>

              {/* High Contrast Regional Pins */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-[var(--color-electric-teal)]/30 bg-[var(--color-electric-teal)]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={20}
                      className="text-[var(--color-electric-teal)]"
                    />
                    <div>
                      <h3 className="font-display font-800 text-lg text-[var(--color-paper-white)]">
                        Dhaka Central
                      </h3>
                      <p className="font-mono text-xs text-[var(--color-muted-sage)]">
                        Primary School Art Education &amp; Campus Competitions
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase font-bold text-[var(--color-acid-leaf)]">
                    Active
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={20}
                      className="text-[var(--color-acid-leaf)]"
                    />
                    <div>
                      <h3 className="font-display font-800 text-lg text-[var(--color-paper-white)]">
                        Sreemangal
                      </h3>
                      <p className="font-mono text-xs text-[var(--color-muted-sage)]">
                        Tea Estate Ecosystem Restoration &amp; Field Notes
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase font-bold text-[var(--color-acid-leaf)]">
                    Active
                  </span>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={20}
                      className="text-[var(--color-solar-yellow)]"
                    />
                    <div>
                      <h3 className="font-display font-800 text-lg text-[var(--color-paper-white)]">
                        Khagrachari
                      </h3>
                      <p className="font-mono text-xs text-[var(--color-muted-sage)]">
                        Hill Tracts Youth Environmental Advocacy
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs uppercase font-bold text-[var(--color-acid-leaf)]">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
