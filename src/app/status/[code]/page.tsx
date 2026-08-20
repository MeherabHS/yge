import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import YgeErrorPage from '@/components/layout/YgeErrorPage';
import { getErrorPageContent } from '@/content/error-pages';

interface StatusPageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: StatusPageProps): Promise<Metadata> {
  const { code } = await params;
  const content = getErrorPageContent(Number(code));

  if (!content) return { title: 'Error' };

  return {
    title: `${content.status} | ${content.title}`,
    description: content.message,
    robots: { index: false, follow: false },
  };
}

export default async function StatusPage({ params }: StatusPageProps) {
  const { code } = await params;
  const content = getErrorPageContent(Number(code));
  if (!content) notFound();

  return <YgeErrorPage {...content} />;
}
