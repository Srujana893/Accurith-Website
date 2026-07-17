import type { NextConfig } from 'next';

// Static export — Cloudflare Pages serves pre-built HTML. No Next.js server at
// runtime; all server code lives in /functions/ as Cloudflare Pages Functions.
//
// DO NOT add headers()/redirects()/rewrites() here — they are no-ops under
// `output: 'export'`. Security headers live in /public/_headers.
const nextConfig: NextConfig = {
  output: 'export',
  // Static export has no image optimizer; without this the build fails on
  // any <Image src=... /> that isn't already pre-optimized.
  images: { unoptimized: true },
  // Predictable routing when Cloudflare Pages serves the /out directory.
  trailingSlash: false,
};

export default nextConfig;
