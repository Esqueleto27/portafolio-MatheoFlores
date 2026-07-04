import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// robots.txt matching is prefix-based and every page lives under a locale
// prefix (/es/…, /en/…), so each private route needs its localized variants
// listed — a bare "/admin" would never match "/es/admin".
const PRIVATE_PATHS = ["/admin", "/login", "/forgot"];
const LOCALES = ["es", "en"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        ...PRIVATE_PATHS.flatMap((path) => [
          path,
          ...LOCALES.map((locale) => `/${locale}${path}`),
        ]),
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
