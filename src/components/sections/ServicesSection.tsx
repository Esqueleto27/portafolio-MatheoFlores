"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ServicePill } from "@/components/ui/Badge";
import { fadeInUp, staggerContainer } from "@/components/animations";
import type { Service, Locale } from "@/lib/mock-data";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -10;
    const ry = (x - 0.5) * 10;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
    el.style.transition = "transform 0.08s ease";

    const glowEl = el.querySelector<HTMLElement>(".svc-glow");
    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(37 99 235 / calc(var(--glow) * 0.5)), transparent 65%)`;
      glowEl.style.opacity = "1";
    }
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.55s cubic-bezier(0.25, 0.4, 0.25, 1)";
    const glowEl = el.querySelector<HTMLElement>(".svc-glow");
    if (glowEl) glowEl.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ height: "100%", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function ServicesSection({
  services,
  locale,
}: {
  services: Service[];
  locale: Locale;
}) {
  const t = useTranslations("services");

  return (
    <section
      style={{
        padding: "80px clamp(20px, 6vw, 72px)",
        background: "var(--bg2)",
      }}
    >
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
            marginBottom: "14px",
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
            marginBottom: "14px",
          }}
        >
          {t("section_title")}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.14 }}
          style={{
            fontSize: "19px",
            color: "var(--muted)",
            marginBottom: "52px",
          }}
        >
          {t("section_desc")}
        </motion.p>

        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(330px, 100%), 1fr))",
            gap: "22px",
          }}
        >
          {services.map((service, i) => {
            const name = locale === "en" ? service.name_en : service.name_es;
            const desc =
              locale === "en" ? service.description_en : service.description_es;

            return (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ boxShadow: "0 20px 60px rgba(37, 99, 235, 0.18)" }}
                style={{ height: "100%" }}
              >
                <TiltCard>
                  <div
                    style={{
                      padding: "24px",
                      borderRadius: "16px",
                      border: "1px solid var(--hair)",
                      background: "var(--card)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Inner glow */}
                    <div
                      className="svc-glow"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "transparent",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                        borderRadius: "16px",
                      }}
                    />

                    {/* Service number */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      style={{
                        fontSize: "13px",
                        fontFamily: "var(--font-geist-mono)",
                        color: "var(--accent)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>

                    <ServicePill>{name}</ServicePill>
                    <p
                      style={{
                        fontSize: "16.5px",
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        margin: 0,
                        flex: 1,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {desc}
                    </p>

                    {/* Image placeholder */}
                    <div
                      style={{
                        height: "120px",
                        borderRadius: "10px",
                        background: "var(--mockup)",
                        backgroundImage:
                          "repeating-linear-gradient(135deg, var(--stripe) 0 2px, transparent 2px 13px)",
                        border: "1px solid var(--hair)",
                        marginTop: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-geist-mono)",
                          color: "var(--muted)",
                        }}
                      >
                        [ referencia ]
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
