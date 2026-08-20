import type { Metadata } from 'next';
import EcoPapersArchive from '@/components/editorial/EcoPapersArchive';

export const metadata: Metadata = {
  title: 'Eco Papers — Youth Environmental Publications',
  description: 'Open-access environmental research and field publications from Youth for a Green Earth.',
};

export default function EcoPapersPage() {
  return <EcoPapersArchive />;
}
