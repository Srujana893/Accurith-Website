import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TransparencyBand from "@/components/TransparencyBand";
import "@/styles/globals.css";

// V02 — self-hosted via next/font, no external font requests at runtime.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// TODO(S-track): real SEO metadata utility + per-page OpenGraph/JSON-LD live in
// Srujana's src/lib/metadata.ts. This is a minimal prototype default only.
export const metadata: Metadata = {
  title: {
    default: "Accurith — Cybersecurity, IS Audit & GRC Advisory",
    template: "%s · Accurith",
  },
  description:
    "Accurith Technologies helps organisations audit, secure, and automate — cybersecurity, IS/IT audit, risk & GRC advisory, and digital forensics, delivered from Bengaluru, India.",
  openGraph: {
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* TODO(S-track): cookie-consent script, privacy-first analytics
          (Plausible/Umami), and JSON-LD organization schema mount here. */}
      <body
        className={`${inter.variable} ${sora.variable} ${mono.variable} font-body`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        {/* Signature element 2 — transparency band on every page, above the footer. */}
        <TransparencyBand />
        <Footer />
      </body>
    </html>
  );
}
