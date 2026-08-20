import type { Metadata } from 'next';
import { Syne, Manrope, Instrument_Serif, Noto_Sans_Bengali, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/content/site';
import { media } from '@/content/media';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ── Font Loading ─────────────────────────────────────────────
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '700'],
  variable: '--font-noto-bengali',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

// ── Default Metadata ──────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultMeta.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.defaultMeta.description,
  keywords: [
    'Youth for a Green Earth',
    'YGE',
    'Bangladesh environment',
    'climate action Bangladesh',
    'youth environmentalism',
    'climate education',
    'Green Genesis',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultMeta.title,
    description: siteConfig.defaultMeta.description,
    images: [
      {
        url: siteConfig.defaultMeta.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultMeta.title,
    description: siteConfig.defaultMeta.description,
    images: [siteConfig.defaultMeta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: `${siteConfig.url}${media.brand.officialLogoSource}`,
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${instrumentSerif.variable} ${notoBengali.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c') }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
