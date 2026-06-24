import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

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

/* Runs before hydration: reads localStorage and sets data-theme to prevent flash */
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`;

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
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main style={{ flex: 1, paddingTop: "80px" }}>{children}</main>
          <Footer />
          <RevealObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
