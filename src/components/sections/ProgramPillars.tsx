"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Megaphone,
  Users,
  Film,
  GraduationCap,
} from "lucide-react";

const pillars = [
  {
    id: "climate-education",
    num: "01",
    title: "Climate Education",
    description:
      "Building environmental literacy from primary schools to universities through art, discussion and hands-on learning.",
    href: "/work/little-green-artists",
    bg: "var(--color-deep-moss)",
    accent: "var(--color-acid-leaf)",
    color: "var(--color-warm-cream)",
    icon: BookOpen,
  },
  {
    id: "youth-voice",
    num: "02",
    title: "Youth Voice & Advocacy",
    description:
      "Amplifying Bangladeshi youth perspectives in local and national climate conversations.",
    href: "/work/youth-voice-advocacy",
    bg: "var(--color-river-blue)",
    accent: "var(--color-electric-teal)",
    color: "var(--color-paper-white)",
    icon: Megaphone,
  },
  {
    id: "community-action",
    num: "03",
    title: "Community Action",
    description:
      "Grassroots campaigns tackling plastic pollution, waste management and ecological restoration across Bangladesh.",
    href: "/work/plastic-awareness-1",
    bg: "var(--color-climate-coral)",
    accent: "var(--color-solar-yellow)",
    color: "var(--color-paper-white)",
    icon: Users,
  },
  {
    id: "creative-media",
    num: "04",
    title: "Creative Climate Media",
    description:
      "Documentaries, photography and storytelling making Bangladesh&apos;s climate realities visible and moving.",
    href: "/work/environmental-documentaries",
    bg: "var(--color-future-violet)",
    accent: "var(--color-warm-cream)",
    color: "var(--color-paper-white)",
    icon: Film,
  },
  {
    id: "green-campus",
    num: "05",
    title: "Project Green Campus",
    description:
      "Embedding sustainability into university culture through inter-university competitions, toolkits and youth leadership.",
    href: "/work/project-green-campus",
    bg: "var(--color-charcoal)",
    accent: "var(--color-acid-leaf)",
    color: "var(--color-warm-cream)",
    icon: GraduationCap,
  },
];

export default function ProgramPillars() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Program pillars"
      className="section-pad"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      <div className="container-yge">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span
              className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border mb-3 inline-block font-bold"
              style={{
                borderColor: "rgba(18,60,47,0.2)",
                color: "var(--color-deep-moss)",
              }}
            >
              Five Pillars of Action
            </span>
            <h2
              className="font-display font-800 text-display leading-tight tracking-tight"
              style={{ color: "var(--color-forest-ink)" }}
            >
              How we lead{" "}
              <em
                className="font-serif italic"
                style={{ color: "var(--color-deep-moss)" }}
              >
                the change
              </em>
            </h2>
          </div>
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 animated-link self-start md:self-auto font-bold"
            style={{ color: "var(--color-forest-ink)" }}
          >
            View All Programs <ArrowRight size={14} />
          </Link>
        </div>

        {/* 5-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const colSpanClass =
              i === 0
                ? "lg:col-span-7"
                : i === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-4";

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={colSpanClass}
              >
                <Link
                  href={pillar.href}
                  className="group block h-full rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.015] hover:shadow-xl flex flex-col justify-between"
                  style={{ backgroundColor: pillar.bg, color: pillar.color }}
                  aria-label={pillar.title}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <span
                      className="font-display font-800 text-3xl opacity-90"
                      style={{ color: pillar.accent }}
                    >
                      {pillar.num}
                    </span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      <Icon size={18} style={{ color: pillar.accent }} />
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="relative z-10 space-y-3">
                    <h3 className="font-display font-800 text-2xl sm:text-3xl leading-tight tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-85 font-body">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Action Link Reveal */}
                  <div
                    className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs uppercase tracking-wider font-bold relative z-10"
                    style={{ color: pillar.accent }}
                  >
                    <span>Explore Pillar</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1.5 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
