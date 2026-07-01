import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ProjectsFilter } from "./ProjectsFilter";
import { getServices, getProjects } from "@/lib/data";
import type { Locale } from "@/lib/mock-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Projects" : "Proyectos",
    description:
      locale === "en"
        ? "All web projects built from scratch for real clients."
        : "Todos mis proyectos web construidos desde cero para clientes reales.",
  };
}

export default async function ProjectsPage() {
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
