import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { SITE_URL as BASE } from "@/lib/seo";
const LOCALES = ["es", "en"] as const;

const STATIC_PATHS = ["/", "/projects", "/about", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1.0 : 0.8,
    }))
  );

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}/projects/${project.slug}`,
      lastModified: project.created_at ? new Date(project.created_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...projectEntries];
}
