import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Safeguarding & Child Protection',
  description: 'Youth for a Green Earth safeguarding and child protection policy.',
};

export default function SafeguardingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-paper-white)' }}>
      <section className="section-pad pt-32" style={{ backgroundColor: 'var(--color-forest-ink)' }} aria-label="Safeguarding hero">
        <div className="container-yge max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--color-muted-sage)' }}>Policy</p>
          <h1 className="font-display font-800 text-display leading-tight tracking-tight mb-4" style={{ color: 'var(--color-paper-white)' }}>Safeguarding &amp; Child Protection</h1>
          <p className="font-mono text-xs" style={{ color: 'var(--color-muted-sage)' }}>Draft — requires YGE review and approval before publication</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-yge max-w-3xl prose-yge">
          <div className="p-5 rounded-xl mb-10 border-l-4" style={{ backgroundColor: 'rgba(255,94,86,0.06)', borderColor: 'var(--color-climate-coral)' }}>
            <p className="font-mono text-xs font-700" style={{ color: 'var(--color-climate-coral)' }}>IMPORTANT: DRAFT NOTICE</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-charcoal)' }}>
              This safeguarding policy requires formal review and approval by Youth for a Green Earth leadership before publication. Because YGE programs engage with children, this policy must be taken seriously and completed with expert guidance where possible.
            </p>
          </div>

          <h2>1. Our commitment</h2>
          <p>Youth for a Green Earth is committed to the safety and wellbeing of all participants in its programs, especially children and young people. No YGE program, event or activity will knowingly put a child at risk.</p>

          <h2>2. Scope</h2>
          <p>This policy applies to all YGE volunteers, staff, advisors, partners and any individual who interacts with children on behalf of YGE.</p>

          <h2>3. Photography and media consent</h2>
          <p>YGE will seek written or verified verbal consent before photographing or filming children. Images of children will not be shared publicly without explicit parental or guardian consent. Where consent cannot be confirmed, images will not be used.</p>
          <p>If you believe an image of a child has been used without appropriate consent, contact us immediately at <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-deep-moss)' }}>{siteConfig.email}</a>.</p>

          <h2>4. Reporting concerns</h2>
          <p>Anyone who witnesses or suspects that a child is at risk in the context of a YGE activity should report this immediately to the YGE program lead and, where appropriate, to local authorities.</p>

          <h2>5. Volunteer conduct</h2>
          <p>YGE volunteers working with children are expected to maintain appropriate professional boundaries at all times. One-to-one interactions between an adult volunteer and a child should be visible to others.</p>

          <h2>6. Terms of Use</h2>
          <p>By using this website you agree to use it only for lawful purposes and in a way that does not infringe the rights of others. YGE reserves the right to update these terms.</p>

          <p className="font-mono text-xs mt-12" style={{ color: 'var(--color-muted-sage)' }}>Last reviewed: Draft. Pending YGE approval.</p>
        </div>
      </section>
    </div>
  );
}
