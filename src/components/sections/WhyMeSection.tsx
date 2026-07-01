"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, slideLeft, slideRight, staggerContainer } from "@/components/animations";

const ICONS = [
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
];

export function WhyMeSection() {
  const t = useTranslations("why_me");

  const items = [
    { num: "01", title: t("item1_title"), desc: t("item1_desc"), icon: ICONS[0] },
    { num: "02", title: t("item2_title"), desc: t("item2_desc"), icon: ICONS[1] },
    { num: "03", title: t("item3_title"), desc: t("item3_desc"), icon: ICONS[2] },
    { num: "04", title: t("item4_title"), desc: t("item4_desc"), icon: ICONS[3] },
  ] as const;

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
            marginBottom: "48px",
          }}
        >
          {t("section_title")}
        </motion.h2>

        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              variants={i % 2 === 0 ? slideLeft : slideRight}
              whileHover={{
                y: -6,
                boxShadow: "0 16px 48px rgba(37, 99, 235, 0.16)",
                borderColor: "rgba(37, 99, 235, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              style={{
                padding: "28px 24px",
                borderRadius: "16px",
                border: "1px solid var(--hair)",
                background: "var(--card)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle corner accent */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "80px",
                  height: "80px",
                  background:
                    "radial-gradient(circle at top right, rgb(37 99 235 / 0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgb(37 99 235 / 0.1)",
                  border: "1px solid rgb(37 99 235 / 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </motion.div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
