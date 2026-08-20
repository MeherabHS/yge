'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { impactMetrics } from '@/content/impact';

function useCountUp(target: number, isActive: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, isActive, duration]);
  return value;
}

function MetricCard({ metric, isActive }: { metric: typeof impactMetrics[0]; isActive: boolean }) {
  const count = useCountUp(metric.value, isActive);
  const displayValue = metric.value >= 1000
    ? count.toLocaleString()
    : count.toString();

  return (
    <div
      className="p-6 rounded-2xl border"
      style={{
        borderColor: 'rgba(200,255,61,0.2)',
        backgroundColor: 'rgba(200,255,61,0.04)',
      }}
    >
      <div
        className="font-display font-800 text-5xl sm:text-6xl tracking-tight count-up mb-2"
        style={{ color: 'var(--color-acid-leaf)' }}
      >
        {metric.unit === '৳' ? '৳' : ''}{displayValue}
        {!metric.unit && metric.id !== 'founded' ? '+' : ''}
      </div>
      <p
        className="font-display font-600 text-lg leading-tight mb-2"
        style={{ color: 'var(--color-warm-cream)' }}
      >
        {metric.label}
      </p>
      <p
        className="font-body text-xs leading-relaxed"
        style={{ color: 'var(--color-muted-sage)' }}
      >
        {metric.description}
      </p>
      {metric.source === 'demo' && (
        <span
          className="mt-3 inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: 'rgba(158,174,163,0.15)',
            color: 'var(--color-muted-sage)',
          }}
        >
          Demo figure
        </span>
      )}
    </div>
  );
}

export default function ImpactMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const verifiedMetrics = impactMetrics.filter((m) => m.source === 'verified').slice(0, 6);
  const demoMetrics = impactMetrics.filter((m) => m.source === 'demo');

  return (
    <section
      ref={ref}
      aria-label="Impact metrics"
      className="section-pad"
      style={{ backgroundColor: 'var(--color-forest-ink)' }}
    >
      <div className="container-yge">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-electric-teal)' }}
            >
              Measured Impact
            </p>
            <h2
              className="font-display font-800 text-display leading-tight tracking-tight"
              style={{ color: 'var(--color-paper-white)' }}
            >
              Numbers that{' '}
              <em className="font-serif not-italic" style={{ color: 'var(--color-acid-leaf)' }}>
                mean something
              </em>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: 'var(--color-muted-sage)' }}
          >
            Verified figures only. We do not fabricate impact.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {verifiedMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} isActive={isInView} />
          ))}
        </div>

        {demoMetrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-2 max-w-lg">
            {demoMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} isActive={isInView} />
            ))}
          </div>
        )}

        <p
          className="mt-8 font-mono text-xs leading-relaxed max-w-2xl"
          style={{ color: 'var(--color-muted-sage)', opacity: 0.7 }}
        >
          Figures shown are based on publicly documented YGE activities and will be updated
          as verified reporting becomes available. Figures marked &ldquo;Demo figure&rdquo;
          are estimates pending confirmation.
        </p>
      </div>
    </section>
  );
}
