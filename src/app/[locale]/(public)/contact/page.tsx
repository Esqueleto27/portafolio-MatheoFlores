import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getServices } from "@/lib/data";
import { ContactForm } from "./ContactForm";
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
    title: locale === "en" ? "Contact" : "Contacto",
    description:
      locale === "en"
        ? "Tell me about your project and I'll respond within 24 hours with a personalised estimate."
        : "Cuéntame tu proyecto y te respondo en menos de 24 horas con un estimado personalizado.",
    alternates: buildAlternates(loc, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const services = await getServices();
  return <ContactForm services={services} />;
}
