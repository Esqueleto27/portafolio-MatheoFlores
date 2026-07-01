"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer } from "@/components/animations";
import type { Project, Locale } from "@/lib/mock-data";

export function FeaturedProjectsSection({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  const t = useTranslations("featured_projects");

  return (
    <section style={{ padding: "80px clamp(20px, 6vw, 72px)" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
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
        </motion.p>

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
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08 }}
            style={{
              fontSize: "clamp(34px, 4.2vw, 54px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              margin: 0,
            }}
          >
            {t("section_title")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button as={Link} href="/projects" variant="secondary" size="compact">
              {t("view_all")} →
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.13, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
            gap: "34px",
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    ease: [0.25, 0.4, 0.25, 1],
                  },
                },
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            >
              <ProjectCard
                project={project}
                locale={locale}
                viewCaseLabel={t("view_case")}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
