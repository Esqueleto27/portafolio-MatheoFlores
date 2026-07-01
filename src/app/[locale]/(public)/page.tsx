import { getLocale } from "next-intl/server";
import { getServices, getFeaturedProjects } from "@/lib/data";
import type { Locale } from "@/lib/mock-data";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { WhyMeSection } from "@/components/sections/WhyMeSection";
import { HowIWorkSection } from "@/components/sections/HowIWorkSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default async function Home() {
  const locale = (await getLocale()) as Locale;
  const [services, featuredProjects] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <HeroSection />
      <ServicesSection services={services} locale={locale} />
      <FeaturedProjectsSection projects={featuredProjects} locale={locale} />
      <WhyMeSection />
      <HowIWorkSection />
      <CtaSection />
    </>
  );
}
