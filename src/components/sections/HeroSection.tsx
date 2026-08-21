"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/content/site";
import { getFeaturedEvent, formatEventDate } from "@/content/events";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function HeroSection() {
  const featuredEvent = getFeaturedEvent();

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[92svh] lg:min-h-[100svh] flex flex-col justify-center overflow-hidden grain pt-28 pb-16"
      style={{ backgroundColor: "var(--color-forest-ink)" }}
    >
      {/* Rich Glowing Atmospheric Radial Lights (No line SVGs) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #C8FF3D 0%, #071A14 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #00DDB3 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-10 right-10 w-[450px] h-[450px] rounded-full pointer-events-none opacity-25 blur-[90px]"
        style={{
          background: "radial-gradient(circle, #8E6CFF 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-yge relative z-10 my-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Main Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.05}
              variants={fadeUp}
            >
              <div
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[var(--color-acid-leaf)]/30 backdrop-blur-md"
                style={{
                  color: "var(--color-acid-leaf)",
                  backgroundColor: "rgba(200,255,61,0.08)",
                }}
              >
                <Sparkles size={13} /> Youth for a Green Earth &middot;
                Bangladesh
              </div>
            </motion.div>

            {/* Monumental Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.15}
              variants={fadeUp}
              className="font-display font-800 text-hero leading-[0.98] tracking-tight text-[var(--color-paper-white)]"
            >
              Bangladesh&apos;s youth are not waiting for a{" "}
              <em className="font-serif not-italic text-[var(--color-acid-leaf)]">
                greener future.
              </em>{" "}
              They&apos;re building it.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.25}
              variants={fadeUp}
              className="text-body-lg leading-relaxed max-w-2xl text-white/85"
            >
              {siteConfig.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.35}
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href={siteConfig.ctas.primary.href}
                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full font-700 transition-all hover:scale-105 shadow-lg"
                style={{
                  backgroundColor: "var(--color-acid-leaf)",
                  color: "var(--color-forest-ink)",
                }}
              >
                {siteConfig.ctas.primary.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href={siteConfig.ctas.secondary.href}
                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full border-2 font-700 transition-all hover:scale-105 backdrop-blur-md"
                style={{
                  borderColor: "rgba(200,255,61,0.4)",
                  color: "var(--color-warm-cream)",
                }}
              >
                {siteConfig.ctas.secondary.label}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Editorial Hero Card & Featured Event */}
          <div className="lg:col-span-5 space-y-6">
            {/* Integrated Organization Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="p-8 rounded-3xl border border-white/15 backdrop-blur-xl relative overflow-hidden space-y-4 shadow-2xl"
              style={{ backgroundColor: "rgba(18,60,47,0.7)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-acid-leaf)]">
                  <ShieldCheck size={14} /> Verified Organization
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted-sage)]">
                  Est. 2024
                </span>
              </div>

              <blockquote className="font-serif italic text-xl text-[var(--color-warm-cream)] leading-snug">
                &ldquo;Awareness is where change begins. Action is where it
                becomes real.&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-acid-leaf)] text-[var(--color-forest-ink)] font-bold">
                  Youth-led
                </span>
                <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-electric-teal)]/20 border border-[var(--color-electric-teal)] text-[var(--color-electric-teal)]">
                  Bangladesh
                </span>
                <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white/80">
                  Zero CMS
                </span>
              </div>
            </motion.div>

            {/* Featured Event Ticket Card */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <Link
                  href={`/events/${featuredEvent.slug}`}
                  className="block p-6 rounded-3xl border border-[var(--color-acid-leaf)] transition-all hover:scale-[1.02] group relative overflow-hidden backdrop-blur-xl shadow-xl"
                  style={{
                    backgroundColor: "rgba(7,26,20,0.9)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold"
                      style={{
                        backgroundColor: "var(--color-acid-leaf)",
                        color: "var(--color-forest-ink)",
                      }}
                    >
                      Featured Event Ticket
                    </span>
                    {featuredEvent.prizePool && (
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: "var(--color-solar-yellow)" }}
                      >
                        {featuredEvent.prizePool}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-700 text-xl leading-tight mb-3 text-[var(--color-paper-white)]">
                    {featuredEvent.title}
                  </h3>
                  <div className="space-y-1.5 font-mono text-xs text-[var(--color-muted-sage)] mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={13}
                        aria-hidden="true"
                        style={{ color: "var(--color-acid-leaf)" }}
                      />
                      {formatEventDate(featuredEvent)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={13}
                        aria-hidden="true"
                        style={{ color: "var(--color-acid-leaf)" }}
                      />
                      {featuredEvent.venue}, {featuredEvent.city}
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider group-hover:gap-2 transition-all font-bold"
                    style={{ color: "var(--color-acid-leaf)" }}
                  >
                    View Competition Segments{" "}
                    <ArrowRight size={12} aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
