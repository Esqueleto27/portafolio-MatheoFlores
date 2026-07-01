import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Contact" : "Contacto",
    description:
      locale === "en"
        ? "Tell me about your project and I'll respond within 24 hours with a personalised estimate."
        : "Contame tu proyecto y te respondo en menos de 24 horas con un estimado personalizado.",
  };
}

export default async function ContactPage() {
  const services = await getServices();
  return <ContactForm services={services} />;
}
