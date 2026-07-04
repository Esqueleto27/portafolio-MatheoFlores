"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ProjectCard";
import { Select } from "@/components/ui/Select";
import { type Locale } from "@/lib/types";
import type { Service, Project } from "@/lib/types";

const CATEGORIES = ["cliente", "demo"] as const;

interface Props {
  locale: Locale;
  services: Service[];
  projects: Project[];
}

export function ProjectsFilter({ locale, services, projects }: Props) {
  const t = useTranslations("projects_page");

  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catMatch = categoryFilter === "all" || p.category === categoryFilter;
      const svcMatch = serviceFilter === "all" || p.service_id === serviceFilter;
      return catMatch && svcMatch;
    });
  }, [categoryFilter, serviceFilter, projects]);

  return (
    <section
      style={{
        padding: "80px clamp(20px, 6vw, 72px)",
        minHeight: "60vh",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        {/* Header */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "12px",
            animation: "mf-fade-up 0.6s cubic-bezier(0.25,0.4,0.25,1) both",
          }}
        >
          {t("section_label")}
        </p>

        <h1
          style={{
            fontSize: "clamp(30px, 3.8vw, 46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "12px",
            animation: "mf-blur-up 0.75s cubic-bezier(0.25,0.4,0.25,1) 0.08s both",
          }}
        >
          {t("section_title")}
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "var(--muted)",
            marginBottom: "36px",
            maxWidth: "600px",
            animation: "mf-fade-up 0.7s cubic-bezier(0.25,0.4,0.25,1) 0.14s both",
          }}
        >
          {t("section_desc")}
        </p>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "44px",
            animation: "mf-fade-up 0.65s cubic-bezier(0.25,0.4,0.25,1) 0.22s both",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "2px",
              padding: "3px",
              borderRadius: "10px",
              border: "1px solid var(--hair)",
              background: "var(--fill)",
            }}
          >
            {["all", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className="filter-btn-tap"
                style={{
                  fontSize: "13px",
                  fontWeight: categoryFilter === cat ? 600 : 500,
                  padding: "7px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: categoryFilter === cat ? "var(--fill2)" : "transparent",
                  color: categoryFilter === cat ? "var(--text)" : "var(--muted)",
                  cursor: "pointer",
                  transition: "color 0.2s, background 0.2s",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {cat === "all"
                  ? t("all")
                  : t(cat === "cliente" ? "category_cliente" : "category_demo")}
              </button>
            ))}
          </div>

          <div style={{ width: "240px", maxWidth: "100%" }}>
            <Select
              value={serviceFilter}
              onChange={setServiceFilter}
              ariaLabel={t("filter_service")}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                padding: "7px 14px",
                borderRadius: "10px",
              }}
              options={[
                { value: "all", label: `${t("all")} — ${t("filter_service")}` },
                ...services.map((s) => ({
                  value: s.id,
                  label: locale === "en" ? s.name_en : s.name_es,
                })),
              ]}
            />
          </div>
        </div>

        {/* Grid or empty state */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
              gap: "34px",
            }}
          >
            {filtered.map((project, i) => (
              <div
                key={project.id}
                style={{
                  animation: "mf-fade-up 0.5s cubic-bezier(0.25,0.4,0.25,1) both",
                  animationDelay: `${Math.min(i * 0.08, 0.4)}s`,
                }}
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
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "18px",
              border: "1px solid var(--hair)",
              background: "var(--card)",
              animation: "mf-fade-up 0.4s cubic-bezier(0.25,0.4,0.25,1) both",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-40%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
                height: "180%",
                background:
                  "radial-gradient(ellipse at center top, rgb(37 99 235 / calc(var(--glow) * 0.7)), transparent 60%)",
                filter: "blur(44px)",
                pointerEvents: "none",
                animation: "mf-glow-fade-soft 3s ease-in-out infinite",
              }}
            />
            <p
              style={{
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 600,
                color: "var(--text)",
                position: "relative",
                marginBottom: "8px",
              }}
            >
              {t("empty_title")}
            </p>
            <p style={{ fontSize: "16px", color: "var(--muted)", position: "relative" }}>
              {t("empty_desc")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
