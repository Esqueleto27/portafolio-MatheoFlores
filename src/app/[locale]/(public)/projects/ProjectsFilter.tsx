"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { type Locale } from "@/lib/mock-data";
import type { Service, Project } from "@/lib/mock-data";
import { fadeInUp, staggerContainer } from "@/components/animations";

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
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
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
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: [0.25, 0.4, 0.25, 1], delay: 0.08 }}
          style={{
            fontSize: "clamp(30px, 3.8vw, 46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "12px",
          }}
        >
          {t("section_title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.14 }}
          style={{
            fontSize: "17px",
            color: "var(--muted)",
            marginBottom: "36px",
            maxWidth: "600px",
          }}
        >
          {t("section_desc")}
        </motion.p>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1], delay: 0.22 }}
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "44px",
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
              <motion.button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            ))}
          </div>

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
              colorScheme: "inherit",
            }}
          >
            <option value="all">{t("all")} — {t("filter_service")}</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {locale === "en" ? s.name_en : s.name_es}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Grid or empty state */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              variants={staggerContainer(0.1, 0)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "34px",
              }}
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 36, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] },
                    },
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                >
                  <ProjectCard
                    project={project}
                    locale={locale}
                    viewCaseLabel={locale === "en" ? "See case" : "Ver caso"}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
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
              <motion.div
                aria-hidden="true"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
              <p style={{ fontSize: "16px", color: "var(--muted)", position: "relative" }}>
                {t("empty_desc")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
