'use client';

import YgeErrorPage from '@/components/layout/YgeErrorPage';
import { getErrorPageContent } from '@/content/error-pages';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const content = getErrorPageContent(500);
  if (!content) return null;

  return <YgeErrorPage {...content} onRetry={reset} />;
}
