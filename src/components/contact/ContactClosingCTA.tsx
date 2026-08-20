import Link from 'next/link';
import { ArrowRight, Sprout } from 'lucide-react';

export default function ContactClosingCTA() {
  return (
    <section className="contact-closing" aria-labelledby="contact-closing-title">
      <div className="contact-paper-texture" aria-hidden="true" />
      <div className="contact-torn-edge contact-torn-lime-top" aria-hidden="true" />
      <div className="contact-shell contact-closing-grid">
        <h2 id="contact-closing-title">Ready when <em>you are.</em></h2>
        <Link href="/contact#contact-form">Write to us <ArrowRight aria-hidden="true" /></Link>
        <Sprout className="contact-closing-sprout" aria-hidden="true" />
      </div>
    </section>
  );
}
