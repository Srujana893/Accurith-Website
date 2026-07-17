import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { organizationJsonLd, SITE_NAME, SITE_URL } from '@/lib/metadata';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Root metadata — page-specific overrides come from each page.tsx via
// createMetadata(). See src/lib/metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Cyber security, IS audit, risk advisory`,
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
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Organization JSON-LD for Google rich results. Data source lives in
            src/lib/metadata.ts — edit there, not here. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
