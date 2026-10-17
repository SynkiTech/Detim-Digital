import type { NextConfig } from "next";

/**
 * Security headers applied to every route. The Content-Security-Policy
 * is production-only (dev overlays/HMR need eval) and is tuned to what
 * this site actually loads: self-hosted assets, the Calendly embed
 * (assets.calendly.com script + calendly.com frame/XHR) and Vercel
 * Analytics (va.vercel-scripts.com). frame-ancestors keeps the site out
 * of strangers' iframes while still allowing the platform's own preview
 * (*.space-z.ai) to embed it.
 */
const isProd = process.env.NODE_ENV === "production";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://assets.calendly.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' https://calendly.com https://va.vercel-scripts.com",
  "frame-src https://calendly.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self' https://*.space-z.ai",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'motion-dom': require.resolve('motion-dom'),
    };
    return config;
  },
    async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
