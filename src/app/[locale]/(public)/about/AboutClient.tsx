"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/animations";

const STACK_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "Tailwind CSS", "Supabase", "Framer Motion", "Stripe",
  "Git", "Docker", "REST APIs", "GraphQL", "Prisma",
  "Python", "Figma", "Vercel", "Cloudflare",
];

export function AboutClient() {
  const t = useTranslations("about");

  return (
    <section style={{ padding: "60px clamp(20px, 6vw, 72px) 100px" }}>
      <div style={{ maxWidth: "min(1080px, 100%)", margin: "0 auto", width: "100%" }}>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
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
          {t("section_title")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.08 }}
          style={{
            fontSize: "clamp(38px, 5vw, 68px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            color: "var(--text)",
            lineHeight: 1.05,
            marginBottom: "32px",
          }}
        >
          {t("intro_title")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.4, 0.25, 1], delay: 0.18 }}
          style={{ maxWidth: "720px" }}
        >
          <p style={{ fontSize: "20px", color: "var(--soft)", lineHeight: 1.7, marginBottom: "20px" }}>
            {t("intro_desc_1")}
          </p>
          <p style={{ fontSize: "20px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "56px" }}>
            {t("intro_desc_2")}
          </p>
        </motion.div>

        {/* Approach card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.4, 0.25, 1], delay: 0.28 }}
          whileHover={{ boxShadow: "0 20px 60px rgba(37, 99, 235, 0.14)", borderColor: "rgba(37, 99, 235, 0.3)" }}
          style={{
            padding: "32px",
            borderRadius: "18px",
            border: "1px solid var(--hair)",
            background: "var(--card)",
            marginBottom: "80px",
            position: "relative",
            overflow: "hidden",
            cursor: "default",
          }}
        >
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-40%",
              right: "-10%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgb(37 99 235 / 0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--accent)",
              marginBottom: "12px",
              position: "relative",
            }}
          >
            {t("approach_title")}
          </h2>
          <p style={{ fontSize: "19px", color: "var(--muted)", lineHeight: 1.65, margin: 0, position: "relative" }}>
            {t("approach_desc")}
          </p>
        </motion.div>

        {/* Stack marquee */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "6px",
            }}
          >
            {t("stack_title")}
          </h2>
          <p style={{ fontSize: "17px", color: "var(--muted)", marginBottom: "28px" }}>
            {t("stack_desc")}
          </p>

          <div
            className="marquee-container"
            style={{
              overflow: "hidden",
              maskImage: "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            }}
          >
            <div
              className="marquee-track"
              style={{
                display: "flex",
                gap: "16px",
                width: "fit-content",
                animation: "mf-marquee 26s linear infinite",
              }}
            >
              {[...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
                <motion.span
                  key={`${item}-${i}`}
                  whileHover={{ scale: 1.08, y: -3 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    background: "var(--fill2)",
                    border: "1px solid var(--hair)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "var(--soft)",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-geist-mono)",
                    cursor: "default",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
