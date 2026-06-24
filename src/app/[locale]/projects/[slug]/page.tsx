import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TechChip, ServicePill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, getServiceName } from "@/lib/data";
import type { Project, Locale } from "@/lib/mock-data";

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
  const problem = locale === "en" ? project.problem_en : project.problem_es;
  const solution = locale === "en" ? project.solution_en : project.solution_es;

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

        {/* Preview image placeholder */}
        <div
          data-reveal
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "18px",
            background: "var(--mockup)",
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--stripe) 0 2px, transparent 2px 13px)",
            border: "1px solid var(--hair)",
            marginBottom: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transitionDelay: "0.18s",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--muted)",
            }}
          >
            [ screenshot ]
          </span>
        </div>

        {/* Problem + Solution grid */}
        <div
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "34px",
            marginBottom: "48px",
            transitionDelay: "0.26s",
          }}
          className="grid-cols-[200px_1fr] max-md:grid-cols-1 max-md:gap-16px"
        >
          <h2
            style={{
              fontSize: "clamp(18px, 2vw, 22px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--accent)",
              margin: 0,
            }}
          >
            {t("problem")}
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--muted)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {problem}
          </p>

          <h2
            style={{
              fontSize: "clamp(18px, 2vw, 22px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--accent)",
              margin: 0,
            }}
          >
            {t("solution")}
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--soft)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {solution}
          </p>
        </div>

        {/* Technologies */}
        <div
          data-reveal
          style={{
            marginBottom: "40px",
            transitionDelay: "0.34s",
          }}
        >
          <h3
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-2)",
              fontFamily: "var(--font-geist-mono)",
              marginBottom: "12px",
            }}
          >
            {t("technologies")}
          </h3>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {project.technologies.map((tech) => (
              <TechChip key={tech}>{tech}</TechChip>
            ))}
          </div>
        </div>

        {/* Live site link */}
        {project.live_url && (
          <div data-reveal style={{ transitionDelay: "0.4s" }}>
            <Button
              as="a"
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              {t("live_site")} ↗
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
