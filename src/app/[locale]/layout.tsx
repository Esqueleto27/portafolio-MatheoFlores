import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { buildAlternates, SITE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === "en" ? "en" : "es";

  const title =
    locale === "en"
      ? "Matheo Flores — Websites that help businesses sell"
      : "Matheo Flores — Webs que ayudan a vender";
  const description =
    locale === "en"
      ? "I design, build and launch complete websites for businesses that want to look professional, appear on Google and turn visits into customers."
      : "Diseño, desarrollo y lanzo webs completas para negocios que quieren verse profesionales, aparecer en Google y convertir visitas en clientes.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | Matheo Flores`,
    },
    description,
    openGraph: {
      title,
      description,
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: buildAlternates(loc, "/"),
  };
}

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matheo Flores",
  url: SITE_URL,
  jobTitle: "Full-Stack Developer",
  address: { "@type": "PostalAddress", addressLocality: "Quito", addressCountry: "EC" },
  sameAs: [
    "https://www.linkedin.com/in/matheo-flores-281160278/",
    "https://www.upwork.com/freelancers/~018e88181a81bc2eec",
    "https://www.workana.com/freelancer/884b69b4188d8850b4253fc9e835a958",
    "https://www.freelancer.com/u/Esqueleto27",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        // Static, non-user-controlled data — safe to inject directly.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />
      {children}
    </NextIntlClientProvider>
  );
}
