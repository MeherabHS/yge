"use client";

import { partners } from "@/content/partners";

// Partner names and logo use require final organizational verification.
const REPEAT = 3;

export default function PartnersSection() {
  const repeated = Array(REPEAT).fill(partners).flat();

  return (
    <section
      aria-label="Partners and collaborators"
      className="py-16 overflow-hidden border-t border-b"
      style={{
        backgroundColor: "var(--color-mist-green)",
        borderColor: "rgba(18,60,47,0.12)",
      }}
    >
      <div className="container-yge mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--color-muted-sage)" }}
          >
            Partners &amp; Collaborators
          </p>
          <p
            className="font-mono text-[10px]"
            style={{ color: "var(--color-muted-sage)" }}
          >
            {/* Partner names and logo use require final organizational verification. */}
            Names shown pending final organizational verification.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden" aria-hidden="true">
        <div className="marquee-track">
          {repeated.map((partner, i) => (
            <div
              key={`${partner.slug}-${i}`}
              className="flex-shrink-0 mx-8 flex flex-col items-center gap-1"
            >
              <div
                className="px-6 py-3 rounded-full border font-display font-600 text-sm whitespace-nowrap"
                style={{
                  borderColor: "rgba(18,60,47,0.2)",
                  backgroundColor: "var(--color-paper-white)",
                  color: "var(--color-deep-moss)",
                }}
              >
                {partner.shortName ?? partner.name}
              </div>
              <span
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "var(--color-muted-sage)" }}
              >
                {partner.relationship}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {repeated.map((partner, i) => (
            <div
              key={`${partner.slug}-dup-${i}`}
              className="flex-shrink-0 mx-8 flex flex-col items-center gap-1"
              aria-hidden="true"
            >
              <div
                className="px-6 py-3 rounded-full border font-display font-600 text-sm whitespace-nowrap"
                style={{
                  borderColor: "rgba(18,60,47,0.2)",
                  backgroundColor: "var(--color-paper-white)",
                  color: "var(--color-deep-moss)",
                }}
              >
                {partner.shortName ?? partner.name}
              </div>
              <span
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "var(--color-muted-sage)" }}
              >
                {partner.relationship}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
