import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// /admin, /login and /forgot live outside the locale-prefixed routes, so
// unlike the public pages they don't need /es and /en variants listed here.
const PRIVATE_PATHS = ["/admin", "/login", "/forgot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", ...PRIVATE_PATHS],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
