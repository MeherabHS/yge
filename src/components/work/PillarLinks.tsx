import Link from 'next/link';
import { ArrowRight, BookOpen, Camera, Leaf, Megaphone, Users } from 'lucide-react';

const pillars = [
  { label: 'Campus', category: 'Campus', icon: Leaf, color: 'lime' },
  { label: 'Education', category: 'Education', icon: BookOpen, color: 'aqua' },
  { label: 'Community', category: 'Community', icon: Users, color: 'coral' },
  { label: 'Advocacy', category: 'Advocacy', icon: Megaphone, color: 'cobalt' },
  { label: 'Creative Media', category: 'Creative Media', icon: Camera, color: 'violet' },
] as const;

export default function PillarLinks() {
  return (
    <nav className="work-pillars" aria-label="Explore programs by pillar">
      <div className="work-shell"><span className="work-pillars-label">Explore by pillar</span><div>{pillars.map(({ label, category, icon: Icon, color }) => <Link key={label} href={`/work?category=${encodeURIComponent(category)}`} className={`pillar-${color}`}><Icon aria-hidden="true" /><span>{label}</span><ArrowRight aria-hidden="true" /></Link>)}</div></div>
    </nav>
  );
}
