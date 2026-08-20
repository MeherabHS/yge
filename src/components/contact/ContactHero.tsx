'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ContactEnvelope from './ContactEnvelope';

export default function ContactHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="contact-hero" aria-labelledby="contact-title">
      <div className="contact-hero-contours" aria-hidden="true">
        <svg viewBox="0 0 900 520" preserveAspectRatio="none">
          {Array.from({ length: 20 }, (_, index) => (
            <path
              key={index}
              d={`M ${285 + index * 11} -25 C ${215 - index * 4} 95, ${590 + index * 9} 108, ${445 + index * 8} 238 S ${790 + index * 6} 390, ${575 + index * 16} 565`}
            />
          ))}
        </svg>
      </div>
      <div className="contact-shell contact-hero-grid">
        <motion.div
          className="contact-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="contact-eyebrow">Contact YGE</p>
          <h1 id="contact-title">
            Start with<br />
            A <em>message.</em>
          </h1>
          <i aria-hidden="true" />
          <p className="contact-hero-support">
            Have an idea, question or reason<br className="contact-desktop-break" /> to collaborate? Send it our way.
          </p>
        </motion.div>
        <ContactEnvelope />
      </div>
      <div className="contact-torn-edge contact-torn-paper" aria-hidden="true" />
    </section>
  );
}
