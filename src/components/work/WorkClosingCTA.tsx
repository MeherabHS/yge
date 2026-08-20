'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CampaignStamp, PaperTexture, TornPaperEdge } from '@/components/editorial/EditorialPrimitives';

export default function WorkClosingCTA() {
  return (
    <motion.section className="work-closing" aria-labelledby="work-closing-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <TornPaperEdge position="top" /><PaperTexture />
      <div className="work-shell work-closing-grid"><h2 id="work-closing-title">Start something with us.</h2><p>Young people, schools, universities and communities can collaborate with YGE to turn environmental ideas into practical action.</p><Link href="/contact" className="dark-button">Contact YGE <ArrowRight aria-hidden="true" /></Link><CampaignStamp dark /></div>
    </motion.section>
  );
}
