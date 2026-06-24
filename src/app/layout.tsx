import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matheo Flores — Full-Stack Developer",
  description:
    "Portafolio de Matheo Flores, desarrollador web full-stack en Quito, Ecuador.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
