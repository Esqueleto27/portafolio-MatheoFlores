import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "About" : "Sobre mí",
    description:
      locale === "en"
        ? "Full-stack web developer from Quito, Ecuador. I handle everything: domain, design, code, SEO and launch."
        : "Desarrollador web full-stack de Quito, Ecuador. Me encargo de todo: dominio, diseño, código, SEO y lanzamiento.",
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
