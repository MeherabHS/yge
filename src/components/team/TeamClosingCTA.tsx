import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HalftonePattern, PaperTexture, TornPaperEdge } from '@/components/editorial/EditorialPrimitives';

export default function TeamClosingCTA() {
  return (
    <section className="team-closing" aria-labelledby="team-closing-title">
      <PaperTexture />
      <HalftonePattern />
      <TornPaperEdge position="top" />
      <div className="team-shell team-closing-grid">
        <h2 id="team-closing-title">Build the next chapter <em>with us.</em></h2>
        <Link href="/contact">Contact YGE <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
