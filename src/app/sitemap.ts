import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { SITE_URL as BASE } from "@/lib/seo";
const LOCALES = ["es", "en"] as const;

const STATIC_PATHS = ["/", "/projects", "/about", "/contact"];

// hreflang alternates per entry — tells Google the /es and /en versions
// are translations of each other, not duplicate content. x-default points
// to Spanish, the site's primary locale.
function languageAlternates(path: string) {
  const clean = path === "/" ? "" : path;
  return {
    languages: {
      es: `${BASE}/es${clean}`,
      en: `${BASE}/en${clean}`,
      "x-default": `${BASE}/es${clean}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1.0 : 0.8,
      alternates: languageAlternates(path),
    }))
  );

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}/projects/${project.slug}`,
      lastModified: project.created_at ? new Date(project.created_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: languageAlternates(`/projects/${project.slug}`),
    }))
  );

  return [...staticEntries, ...projectEntries];
}
