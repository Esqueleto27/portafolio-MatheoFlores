import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutClient } from "./AboutClient";
import { buildAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";

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
    title: locale === "en" ? "About" : "Sobre mí",
    description:
      locale === "en"
        ? "Full-stack web developer from Quito, Ecuador. I handle everything: domain, design, code, SEO and launch."
        : "Desarrollador web full-stack de Quito, Ecuador. Me encargo de todo: dominio, diseño, código, SEO y lanzamiento.",
    alternates: buildAlternates(loc, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutClient />;
}
