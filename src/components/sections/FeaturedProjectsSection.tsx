"use client";

import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import type { Project, Service, Locale } from "@/lib/types";

export function FeaturedProjectsSection({
  projects,
  services,
  locale,
}: {
  projects: Project[];
  services: Service[];
  locale: Locale;
}) {
  const t = useTranslations("featured_projects");

  return (
    <section style={{ padding: "80px clamp(20px, 6vw, 72px)" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <p
          data-reveal
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "12px",
          }}
        >
          {t("section_label")}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "40px",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <h2
            data-reveal
            style={{
              fontSize: "clamp(34px, 4.2vw, 54px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              margin: 0,
              transitionDelay: "0.08s",
            }}
          >
            {t("section_title")}
          </h2>

          <div data-reveal className="hero-btn-scale" style={{ transitionDelay: "0.15s" }}>
            <Button as={Link} href="/projects" variant="secondary" size="compact">
              {t("view_all")} →
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
            gap: "34px",
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-reveal
              style={{ transitionDelay: `${i * 0.13}s` }}
            >
              <ProjectCard
                project={project}
                services={services}
                locale={locale}
                viewCaseLabel={t("view_case")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
