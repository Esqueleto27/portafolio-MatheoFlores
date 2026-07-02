import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServicePill } from "@/components/ui/Badge";
import { getProjectBySlug, getServiceName } from "@/lib/data";
import type { Project, Locale } from "@/lib/mock-data";
import { DescriptionHeader } from "@/components/project-detail/DescriptionHeader";
import { ChallengeSolutionBlock } from "@/components/project-detail/ChallengeSolutionBlock";
import { ResultsSection } from "@/components/project-detail/ResultsSection";
import { FeaturesList } from "@/components/project-detail/FeaturesList";
import { TechStrip } from "@/components/project-detail/TechStrip";
import { LinksSection } from "@/components/project-detail/LinksSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = locale === "en" ? project.business_en : project.business_es;
  const description = locale === "en" ? project.problem_en : project.problem_es;
  return {
    title,
    description: description?.slice(0, 160) ?? undefined,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const serviceName = await getServiceName(project.service_id, locale);

  return (
    <ProjectDetailContent project={project} locale={locale} serviceName={serviceName} />
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
        <div
          data-reveal
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "18px",
            background: "var(--mockup)",
            backgroundImage: project.image_url
              ? "none"
              : "repeating-linear-gradient(135deg, var(--stripe) 0 2px, transparent 2px 13px)",
            border: "1px solid var(--hair)",
            marginBottom: "56px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transitionDelay: "0.18s",
          }}
        >
          {project.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image_url}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                position: "absolute",
                inset: 0,
              }}
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
        </div>

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
