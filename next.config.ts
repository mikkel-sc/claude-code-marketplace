import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Static export configuration for GitHub Pages
  output: 'export',
  
  // Base path for GitHub Pages deployment
  basePath: '/claude-code-marketplace',

  // Security: Enable strict mode
  reactStrictMode: true,

  // Security: Disable X-Powered-By header
  poweredByHeader: false,

  // Security: Configure allowed image domains
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
