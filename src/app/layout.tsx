import "./globals.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The theme is user-toggled (data-theme attribute), not media-query
  // driven, so a single dark themeColor matches the default experience.
  themeColor: "#070708",
};

export const metadata: Metadata = {
  // The [locale] layout defines its own richer metadata — this base only
  // covers the locale-free routes (/admin, /login, /forgot, 404).
  metadataBase: new URL(SITE_URL),
  title: "Matheo Flores — Full-Stack Developer",
  description:
    "Portafolio de Matheo Flores, desarrollador web full-stack en Quito, Ecuador.",
};

// This root layout sits above the [locale] segment, so it can't read the
// current locale from params — and calling a next-intl/cookies API here
// would force dynamic rendering on every page in the app (defeating the
// `revalidate` caching set on the public pages below). Instead: render
// with the default locale, then correct `lang` and the theme attribute
// synchronously via an inline script that runs before first paint — no
// network request, no visible flash, no dynamic rendering.
const INIT_SCRIPT = `try{
if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light');
var m=location.pathname.match(/^\\/(en|es)(\\/|$)/);
if(m)document.documentElement.lang=m[1];
}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={routing.defaultLocale}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Script
          id="theme-locale-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
