'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function ContactEnvelope() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="contact-envelope-scene"
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, x: 28, rotate: 1.5 }}
      animate={{ opacity: 1, x: 0, rotate: -1.1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/images/contact/contact-envelope.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 54vw, 100vw"
        className="object-contain"
      />
    </motion.div>
  );
}
