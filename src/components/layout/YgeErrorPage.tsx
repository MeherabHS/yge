"use client";

import Link from "next/link";
import { ArrowRight, Home, RefreshCw } from "lucide-react";
import type { ErrorPageContent } from "@/content/error-pages";
import { YGELogo } from "@/components/global/YGELogo";

interface YgeErrorPageProps extends ErrorPageContent {
  onRetry?: () => void;
  standalone?: boolean;
}

export default function YgeErrorPage({
  status,
  eyebrow,
  title,
  message,
  onRetry,
  standalone = false,
}: YgeErrorPageProps) {
  return (
    <div
      className={`yge-error-shell${standalone ? " yge-error-standalone" : ""}`}
    >
      {standalone && <YGELogo priority className="yge-error-emergency-brand" />}

      <section className="yge-error-page" aria-labelledby="error-page-title">
        <div className="container-yge yge-error-container">
          <div className="yge-error-code" aria-hidden="true">
            {status}
          </div>

          <div className="yge-error-copy">
            <p className="yge-error-eyebrow">{eyebrow}</p>
            <h1 id="error-page-title">{title}</h1>
            <p className="yge-error-message">{message}</p>

            <div className="yge-error-actions">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="yge-error-primary"
                >
                  <RefreshCw aria-hidden="true" /> Try Again
                </button>
              )}
              <Link
                href="/"
                className={
                  onRetry ? "yge-error-secondary" : "yge-error-primary"
                }
              >
                <Home aria-hidden="true" /> Back to Home
              </Link>
              <Link href="/contact" className="yge-error-text-link">
                Contact YGE <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="yge-error-field-note" aria-hidden="true">
            <span>Awareness</span>
            <ArrowRight />
            <span>Action</span>
          </div>
        </div>
      </section>
    </div>
  );
}
