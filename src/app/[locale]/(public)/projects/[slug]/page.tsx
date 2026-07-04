import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServicePill } from "@/components/ui/Badge";
import { getProjectBySlug, getServiceName, getProjects } from "@/lib/data";
import type { Project, Locale } from "@/lib/types";
import { routing } from "@/i18n/routing";
import { BrowserFrame, PhoneFrame } from "@/components/project-detail/DeviceFrames";
import { BeforeAfterSlider } from "@/components/project-detail/BeforeAfterSlider";
import { DescriptionHeader } from "@/components/project-detail/DescriptionHeader";
import { ChallengeSolutionBlock } from "@/components/project-detail/ChallengeSolutionBlock";
import { ResultsSection } from "@/components/project-detail/ResultsSection";
import { FeaturesList } from "@/components/project-detail/FeaturesList";
import { TechStrip } from "@/components/project-detail/TechStrip";
import { LinksSection } from "@/components/project-detail/LinksSection";
import { DemoNotice } from "@/components/project-detail/DemoNotice";
import { buildAlternates, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const loc = locale === "en" ? "en" : "es";
  const title = locale === "en" ? project.business_en : project.business_es;
  const description = locale === "en" ? project.problem_en : project.problem_es;
  return {
    title,
    description: description?.slice(0, 160) ?? undefined,
    alternates: buildAlternates(loc, `/projects/${slug}`),
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: paramLocale, slug } = await params;
  setRequestLocale(paramLocale);
  const locale = (await getLocale()) as Locale;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const customTag = locale === "en" ? project.custom_tag_en : project.custom_tag_es;
  const serviceName = customTag || (await getServiceName(project.service_id, locale));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: locale === "en" ? project.business_en : project.business_es,
    description: locale === "en" ? project.problem_en : project.problem_es,
    url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    ...(project.image_url ? { image: project.image_url } : {}),
    creator: { "@type": "Person", name: "Matheo Flores", url: SITE_URL },
    keywords: project.technologies.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailContent project={project} locale={locale} serviceName={serviceName} />
    </>
  );
}

function ProjectDetailContent({
  project,
  locale,
  serviceName,
}: {
  project: Project;
  locale: Locale;
  serviceName: string;
}) {
  const t = useTranslations("project_detail");
  const title = locale === "en" ? project.business_en : project.business_es;
  const description = locale === "en" ? project.description_en : project.description_es;
  const objective = locale === "en" ? project.objective_en : project.objective_es;
  const problem = locale === "en" ? project.problem_en : project.problem_es;
  const solution = locale === "en" ? project.solution_en : project.solution_es;
  const results = locale === "en" ? project.results_en : project.results_es;

  return (
    <section
      style={{
        padding: "60px clamp(20px, 6vw, 72px) 100px",
      }}
    >
      <div
        style={{
          maxWidth: "min(1080px, 100%)",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Back link */}
        <Link
          href="/projects"
          className="link-accent"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "32px",
          }}
        >
          {t("back")}
        </Link>

        {/* Service pill */}
        <div data-reveal style={{ marginBottom: "16px" }}>
          <ServicePill>{serviceName}</ServicePill>
        </div>

        {/* Title */}
        <h1
          data-reveal
          style={{
            fontSize: "clamp(34px, 4.6vw, 60px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            color: "var(--text)",
            lineHeight: 1.05,
            marginBottom: "48px",
            transitionDelay: "0.1s",
          }}
        >
          {title}
        </h1>

        {/* Preview image */}
        <BrowserFrame transitionDelay={0.18}>
          {project.before_image_url && project.image_url ? (
            <BeforeAfterSlider
              beforeUrl={project.before_image_url}
              afterUrl={project.image_url}
              beforeLabel={t("before")}
              afterLabel={t("after")}
              alt={title}
              eager
            />
          ) : project.image_url || project.before_image_url ? (
            <Image
              src={(project.image_url || project.before_image_url)!}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1080px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--muted)",
              }}
            >
              [ screenshot ]
            </span>
          )}
        </BrowserFrame>

        {/* Mobile preview */}
        {(project.mobile_image_url || project.before_mobile_image_url) && (
          <div data-reveal style={{ marginBottom: "56px", transitionDelay: "0.2s" }}>
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {t("mobile_preview_title")}
            </h3>
            <PhoneFrame>
              {project.before_mobile_image_url && project.mobile_image_url ? (
                <BeforeAfterSlider
                  beforeUrl={project.before_mobile_image_url}
                  afterUrl={project.mobile_image_url}
                  beforeLabel={t("before")}
                  afterLabel={t("after")}
                  alt={title}
                />
              ) : (
                <Image
                  src={(project.mobile_image_url || project.before_mobile_image_url)!}
                  alt={title}
                  fill
                  loading="lazy"
                  sizes="260px"
                  style={{ objectFit: "cover" }}
                />
              )}
            </PhoneFrame>
          </div>
        )}

        {/* Description */}
        <DescriptionHeader description={description} transitionDelay={0.22} />

        {/* Objective + Problem, then Solution */}
        <ChallengeSolutionBlock
          objective={objective}
          problem={problem}
          solution={solution}
          objectiveLabel={t("objective_and_problem")}
          solutionLabel={t("solution")}
          transitionDelay={0.26}
        />

        {/* Results */}
        <ResultsSection title={t("results")} content={results} transitionDelay={0.32} />

        {/* Features */}
        <FeaturesList
          features={project.features}
          title={t("features_title")}
          locale={locale}
          transitionDelay={0.36}
        />

        {/* Technologies */}
        <TechStrip technologies={project.technologies} title={t("technologies")} transitionDelay={0.4} />

        {/* Demo disclaimer — only for demo projects, right before the live link */}
        {project.category === "demo" && (
          <DemoNotice
            title={t("demo_notice_title")}
            description={t("demo_notice_desc")}
            transitionDelay={0.42}
          />
        )}

        {/* Links */}
        <LinksSection
          liveUrl={project.live_url}
          githubUrl={project.github_url}
          showCode={project.show_code}
          videoUrl={project.video_url}
          liveLabel={t("live_site")}
          githubLabel={t("github_link")}
          codeUnavailableLabel={t("code_unavailable")}
          videoLabel={t("video_link")}
          transitionDelay={0.44}
        />
      </div>
    </section>
  );
}
