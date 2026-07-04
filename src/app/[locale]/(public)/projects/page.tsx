import type { Metadata } from "next";
import { getLocale, setRequestLocale } from "next-intl/server";
import { ProjectsFilter } from "./ProjectsFilter";
import { getServices, getProjects } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === "en" ? "en" : "es";
  return {
    title: locale === "en" ? "Projects" : "Proyectos",
    description:
      locale === "en"
        ? "All web projects built from scratch for real clients."
        : "Todos mis proyectos web construidos desde cero para clientes reales.",
    alternates: buildAlternates(loc, "/projects"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  setRequestLocale(paramLocale);
  const locale = (await getLocale()) as Locale;
  const [services, projects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);

  return (
    <ProjectsFilter
      locale={locale}
      services={services}
      projects={projects}
    />
  );
}
