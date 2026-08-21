"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Building2, Handshake } from "lucide-react";

const pathways = [
  {
    icon: Heart,
    label: "Become a Volunteer",
    href: "/contact#contact-form",
    color: "var(--color-climate-coral)",
  },
  {
    icon: Building2,
    label: "Bring YGE to Your Campus",
    href: "/contact#contact-form",
    color: "var(--color-electric-teal)",
  },
  {
    icon: Handshake,
    label: "Partner With YGE",
    href: "/contact#contact-form",
    color: "var(--color-future-violet)",
  },
];

export default function JoinSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Contact YGE"
      className="section-pad grain"
      style={{ backgroundColor: "var(--color-deep-moss)" }}
    >
      <div className="container-yge">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-widest mb-6"
            style={{ color: "var(--color-electric-teal)" }}
          >
            Contact YGE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-800 text-display leading-tight tracking-tight mb-8"
            style={{ color: "var(--color-paper-white)" }}
          >
            You don&apos;t need permission to care.{" "}
            <em
              className="font-serif not-italic"
              style={{ color: "var(--color-acid-leaf)" }}
            >
              You need a place to act.
            </em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-body-lg leading-relaxed mb-12 max-w-xl"
            style={{ color: "rgba(245,241,231,0.75)" }}
          >
            Whether you&apos;re a student, a university, or an organization —
            YGE has a pathway for you. Climate action is a team sport.
          </motion.p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {pathways.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                >
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-6 py-3.5 rounded-full border-2 font-700 transition-all hover:scale-105 group"
                    style={{ borderColor: p.color, color: p.color }}
                  >
                    <Icon
                      size={18}
                      aria-hidden="true"
                      style={{ color: p.color }}
                    />
                    {p.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
