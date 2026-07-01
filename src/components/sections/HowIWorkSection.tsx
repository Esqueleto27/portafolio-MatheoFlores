"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp } from "@/components/animations";

const ICONS = [
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <path d="M13 17h8M17 13v8" />
  </svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
];

const CARD_VARIANTS = [
  { hidden: { opacity: 0, x: -36, y: 24 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } } },
  { hidden: { opacity: 0, x: 36, y: 24 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 } } },
  { hidden: { opacity: 0, x: -36, y: 24 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.18 } } },
  { hidden: { opacity: 0, x: 36, y: 24 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.26 } } },
];

export function HowIWorkSection() {
  const t = useTranslations("how_i_work");

  const steps = [
    { num: "01", title: t("step1_title"), desc: t("step1_desc"), icon: ICONS[0] },
    { num: "02", title: t("step2_title"), desc: t("step2_desc"), icon: ICONS[1] },
    { num: "03", title: t("step3_title"), desc: t("step3_desc"), icon: ICONS[2] },
    { num: "04", title: t("step4_title"), desc: t("step4_desc"), icon: ICONS[3] },
  ];

  return (
    <section
      id="process"
      style={{
        padding: "96px clamp(20px, 6vw, 72px)",
        scrollMarginTop: "96px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
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
              margin: 0,
            }}
          >
            {t("section_title")}
          </motion.h2>
        </div>

        {/* 2×2 grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={CARD_VARIANTS[i]}
              whileHover={{
                y: -7,
                boxShadow: "0 28px 72px rgba(37,99,235,0.16)",
                borderColor: "rgba(37,99,235,0.32)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              style={{
                padding: "36px 36px 36px 40px",
                borderRadius: "20px",
                border: "1px solid var(--hair)",
                background: "var(--card)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {/* Giant bg number */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-28px",
                  right: "-8px",
                  fontSize: "clamp(140px, 14vw, 190px)",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  color: "var(--accent-2)",
                  opacity: 0.045,
                  pointerEvents: "none",
                  userSelect: "none",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {step.num}
              </div>

              {/* Top shimmer */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "15%",
                  right: "15%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(37,99,235,0.28) 50%, transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* Left accent strip */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "18%",
                  bottom: "18%",
                  width: "2px",
                  background:
                    "linear-gradient(to bottom, transparent, var(--accent) 40%, var(--accent-2) 60%, transparent)",
                  opacity: 0.5,
                  borderRadius: "999px",
                }}
              />

              {/* Icon + step label row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "32px",
                  position: "relative",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "13px",
                    background: "rgb(37 99 235 / 0.1)",
                    border: "1px solid rgb(37 99 235 / 0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-2)",
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </motion.div>

                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-geist-mono)",
                    color: "var(--accent)",
                    letterSpacing: "0.12em",
                    opacity: 0.65,
                  }}
                >
                  {step.num}&thinsp;/&thinsp;04
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(20px, 2.1vw, 26px)",
                  fontWeight: 700,
                  color: "var(--text)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  marginBottom: "14px",
                  position: "relative",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  margin: 0,
                  position: "relative",
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
