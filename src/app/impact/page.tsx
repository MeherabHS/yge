import type { Metadata } from 'next';
import { impactMetrics, impactLocations } from '@/content/impact';

export const metadata: Metadata = {
  title: 'Impact & Measurement — Youth for a Green Earth',
  description: 'Transparent, evidence-led impact reporting from Youth for a Green Earth activities in Bangladesh.',
};

export default function ImpactPage() {
  const verified = impactMetrics.filter((m) => m.source === 'verified');
  const demo = impactMetrics.filter((m) => m.source === 'demo');

  return (
    <div style={{ backgroundColor: 'var(--color-forest-ink)', color: 'var(--color-paper-white)' }}>
      {/* Hero */}
      <section className="section-pad pt-36 pb-20 grain" aria-label="Impact hero">
        <div className="container-yge max-w-4xl">
          <span
            className="font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block mb-6 font-bold"
            style={{ backgroundColor: 'var(--color-solar-yellow)', color: 'var(--color-forest-ink)' }}
          >
            Evidence &amp; Transparency
          </span>
          <h1 className="font-display font-800 text-hero leading-[0.98] tracking-tight mb-6">
            Honest <em className="font-serif italic" style={{ color: 'var(--color-solar-yellow)' }}>numbers.</em> Zero fabrication.
          </h1>
          <p className="text-body-lg leading-relaxed max-w-2xl text-white/80">
            Youth for a Green Earth does not manufacture impact statistics. Every figure below is grounded in publicly documented YGE activities across Bangladesh.
          </p>
        </div>
      </section>

      {/* Verified Metrics Grid */}
      <section className="section-pad border-t border-white/10" style={{ backgroundColor: 'rgba(18,60,47,0.5)' }} aria-label="Verified metrics">
        <div className="container-yge">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-solar-yellow)] block mb-2">Verified Data</span>
            <h2 className="font-display font-800 text-3xl sm:text-4xl text-[var(--color-paper-white)]">
              Documented Impact Metrics
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verified.map((m) => (
              <div
                key={m.id}
                className="p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4"
                style={{ backgroundColor: 'var(--color-forest-ink)' }}
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--color-solar-yellow)]/20 text-[var(--color-solar-yellow)] font-bold">
                    Verified
                  </span>
                  <div className="font-display font-800 text-5xl sm:text-6xl tracking-tight text-[var(--color-solar-yellow)]">
                    {m.unit === '৳' ? '৳' : ''}{m.value.toLocaleString()}{!m.unit && m.id !== 'founded' ? '+' : ''}
                  </div>
                  <h3 className="font-display font-700 text-xl text-[var(--color-paper-white)]">{m.label}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo / Estimate Figures */}
      {demo.length > 0 && (
        <section className="py-16 border-t border-white/10" style={{ backgroundColor: 'var(--color-forest-ink)' }} aria-label="Demonstration figures">
          <div className="container-yge">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted-sage)] block mb-2">Demo Estimates</span>
            <h3 className="font-display font-700 text-2xl text-[var(--color-paper-white)] mb-6">Demonstration Figures</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {demo.map((m) => (
                <div key={m.id} className="p-6 rounded-2xl border border-dashed border-white/20 opacity-75">
                  <div className="font-display font-800 text-4xl text-[var(--color-solar-yellow)] mb-2">
                    {m.value.toLocaleString()}+
                  </div>
                  <p className="font-display font-700 text-base text-[var(--color-paper-white)] mb-1">{m.label}</p>
                  <p className="text-xs text-[var(--color-muted-sage)]">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Activity Locations */}
      <section className="section-pad border-t border-white/10" style={{ backgroundColor: 'var(--color-deep-moss)' }} aria-label="Activity locations">
        <div className="container-yge">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-solar-yellow)] block mb-2">Geographic Footprint</span>
            <h2 className="font-display font-800 text-3xl sm:text-4xl text-[var(--color-paper-white)]">
              Where YGE Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {impactLocations.map((loc) => (
              <div key={loc.id} className="p-6 rounded-2xl border border-white/10 bg-black/20 space-y-3">
                <span className="font-mono text-xs font-bold text-[var(--color-solar-yellow)]">{loc.region}</span>
                <h3 className="font-display font-800 text-2xl text-[var(--color-paper-white)]">{loc.name}</h3>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {loc.activities.map((act) => (
                    <span key={act} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/80">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
