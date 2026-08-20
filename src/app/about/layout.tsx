import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Youth for a Green Earth',
  description: 'Learn about YGE’s mission, vision, story, values and youth-led environmental work in Bangladesh.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
