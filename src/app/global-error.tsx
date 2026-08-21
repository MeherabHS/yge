"use client";

import YgeErrorPage from "@/components/layout/YgeErrorPage";
import { getErrorPageContent } from "@/content/error-pages";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const content = getErrorPageContent(500);
  if (!content) return null;

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#061e17", color: "#faf8f1" }}>
        <YgeErrorPage {...content} onRetry={reset} standalone />
      </body>
    </html>
  );
}
