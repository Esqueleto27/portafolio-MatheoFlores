import "./globals.css";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Matheo Flores — Full-Stack Developer",
  description:
    "Portafolio de Matheo Flores, desarrollador web full-stack en Quito, Ecuador.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  return (
    <html
      lang="es"
      suppressHydrationWarning
      {...(theme === "light" ? { "data-theme": "light" } : {})}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {children}
      </body>
    </html>
  );
}
