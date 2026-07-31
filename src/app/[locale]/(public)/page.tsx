import { getLocale, setRequestLocale } from "next-intl/server";
import { getServices, getFeaturedProjects } from "@/lib/data";
import type { Locale } from "@/lib/types";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { WhyMeSection } from "@/components/sections/WhyMeSection";
import { HowIWorkSection } from "@/components/sections/HowIWorkSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { routing } from "@/i18n/routing";

// Data only changes via the admin panel, which already calls
// revalidatePath on every write — this just avoids hitting the
// database on every request in between.
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  setRequestLocale(paramLocale);
  const locale = (await getLocale()) as Locale;
  const [services, featuredProjects] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <HeroSection />
      <ServicesSection services={services} locale={locale} />
      <FeaturedProjectsSection projects={featuredProjects} services={services} locale={locale} />
      <WhyMeSection />
      <HowIWorkSection />
      <CtaSection />
    </>
  );
}
