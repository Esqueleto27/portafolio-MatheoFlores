import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// 'unsafe-inline' for script/style is required here, not just convenient:
// the UI is built with inline `style={{...}}` props (CSS-in-JS via the
// style attribute) throughout, and nonce-based CSP does not cover inline
// style attributes at all (only <style> tags Next manages) — a strict
// nonce policy would silently break every component's styling. This still
// blocks the things that matter for this app's threat model: third-party
// script/resource injection, framing, and non-HTTPS upgrades.
//
// 'unsafe-eval' is dev-only — React uses eval() in development to
// reconstruct server error stacks in the browser; it's never used in
// production builds.
//
// cloudflareinsights.com is Cloudflare Web Analytics (cookieless), which
// Cloudflare injects on the custom domain once enabled in the dashboard.
const isDev = process.env.NODE_ENV === "development";
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self' https://cloudflareinsights.com${isDev ? " ws: http://localhost:*" : ""};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: cspHeader },
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Must exceed the 5 MB image limit enforced in uploadImageAction
      // (plus multipart overhead), or valid uploads die at the framework
      // layer before our own validation ever runs.
      bodySizeLimit: "6mb",
    },
  },
  // Uploaded project images live in R2 and are served same-origin through
  // /api/media (see uploadImageAction) — no remote image hosts to allowlist.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

// Makes the wrangler.jsonc bindings (D1, R2, vars) available to
// getCloudflareContext() during `next dev`, backed by local .wrangler state.
initOpenNextCloudflareForDev();
