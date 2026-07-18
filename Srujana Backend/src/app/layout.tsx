import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import { organizationJsonLd, SITE_NAME, SITE_URL } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransparencyBand from '@/components/TransparencyBand';
import './globals.css';

// Fonts — self-hosted via next/font, no external font requests at runtime.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// latin-ext: the wordmark uses the dotless "ı" (U+0131) so the logo's
// verified node can replace the tittle — that glyph lives in latin-ext.
const sora = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-sora' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jbmono' });

// Root metadata — page-specific overrides come from each page.tsx via
// createMetadata(). See src/lib/metadata.ts. (Srujana owns this export.)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Cybersecurity, IS Audit & GRC Advisory`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Cyber security, IS/IT audit, risk management and digital forensics advisory for enterprises in India.',
  alternates: { canonical: '/' },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_IN',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: 'summary_large_image' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the per-request nonce that middleware.ts set. Every inline script we
  // emit must carry this nonce, otherwise the CSP will block it.
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable} h-full`}>
      <body className="font-body flex min-h-full flex-col">
        {/* Organization JSON-LD for Google rich results. Data lives in
            src/lib/metadata.ts — edit there, not here. (Srujana owns.) */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="focus:text-navy sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        {/* Signature element 2 — transparency band on every page, above the footer. */}
        <TransparencyBand />
        <Footer />
      </body>
    </html>
  );
}
