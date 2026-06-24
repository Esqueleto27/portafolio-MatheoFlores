"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ProjectCard";
import { type Locale } from "@/lib/mock-data";
import type { Service, Project } from "@/lib/mock-data";

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
          data-reveal
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
          {t("section_label")}
        </p>

        <h1
          data-reveal
          style={{
            fontSize: "clamp(30px, 3.8vw, 46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "12px",
            transitionDelay: "0.08s",
          }}
        >
          {t("section_title")}
        </h1>

        <p
          data-reveal
          style={{
            fontSize: "17px",
            color: "var(--muted)",
            marginBottom: "36px",
            maxWidth: "600px",
            transitionDelay: "0.14s",
          }}
        >
          {t("section_desc")}
        </p>

        {/* Filters */}
        <div
          data-reveal
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "44px",
            transitionDelay: "0.22s",
          }}
        >
          {/* Category filter */}
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
            <button
              onClick={() => setCategoryFilter("all")}
              style={{
                fontSize: "13px",
                fontWeight: categoryFilter === "all" ? 600 : 500,
                padding: "7px 14px",
                borderRadius: "8px",
                border: "none",
                background: categoryFilter === "all" ? "var(--fill2)" : "transparent",
                color: categoryFilter === "all" ? "var(--text)" : "var(--muted)",
                cursor: "pointer",
                transition: "color 0.2s, background 0.2s",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              {t("all")}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
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
                {t(cat === "cliente" ? "category_cliente" : "category_demo")}
              </button>
            ))}
          </div>

          {/* Service filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              padding: "7px 14px",
              borderRadius: "10px",
              border: "1px solid var(--hair)",
              background: "var(--fill)",
              color: "var(--text)",
              cursor: "pointer",
              fontFamily: "var(--font-geist-sans)",
              outline: "none",
            }}
          >
            <option value="all">{t("all")} — {t("filter_service")}</option>
            {services.map((s) => {
              const name = locale === "en" ? s.name_en : s.name_es;
              return (
                <option key={s.id} value={s.id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Grid or empty state */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "34px",
            }}
          >
            {filtered.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  project={project}
                  locale={locale}
                  viewCaseLabel={
                    locale === "en" ? "See case" : "Ver caso"
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            data-reveal
            style={{
              textAlign: "center",
              padding: "80px 20px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "18px",
              border: "1px solid var(--hair)",
              background: "var(--card)",
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
            <p
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                position: "relative",
              }}
            >
              {t("empty_desc")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
