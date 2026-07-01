import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SetLang } from "@/components/SetLang";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "en"
      ? "Matheo Flores — Websites that help businesses sell"
      : "Matheo Flores — Webs que ayudan a vender";
  const description =
    locale === "en"
      ? "I design, build and launch complete websites for businesses that want to look professional, appear on Google and turn visits into customers."
      : "Diseño, desarrollo y lanzo webs completas para negocios que quieren verse profesionales, aparecer en Google y convertir visitas en clientes.";

  return {
    metadataBase: new URL("https://matheoflores.dev"),
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
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

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

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetLang locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
