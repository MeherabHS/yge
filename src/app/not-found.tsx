import YgeErrorPage from '@/components/layout/YgeErrorPage';
import { getErrorPageContent } from '@/content/error-pages';

export default function NotFound() {
  const content = getErrorPageContent(404);
  if (!content) return null;

  return <YgeErrorPage {...content} />;
}
