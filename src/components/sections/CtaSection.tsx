"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { staggerContainer, wordReveal } from "@/components/animations";

function AnimatedWords({ text, style }: { text: string; style?: React.CSSProperties }) {
  const words = text.split(" ");
  return (
    <motion.h2
      variants={staggerContainer(0.06, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ perspective: "600px", ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export function CtaSection() {
  const t = useTranslations("cta_section");

  return (
    <section style={{ padding: "80px clamp(20px, 6vw, 72px)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          borderRadius: "24px",
          border: "1px solid var(--hair)",
          background: "var(--card)",
          padding: "64px clamp(24px, 5vw, 80px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Pulsing glow */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-60%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "200%",
            background:
              "radial-gradient(ellipse at center top, rgb(37 99 235 / calc(var(--glow) * 0.95)), transparent 60%)",
            filter: "blur(44px)",
            pointerEvents: "none",
          }}
        />

        {/* Secondary ring glow */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "1px solid rgb(37 99 235 / 0.15)",
            pointerEvents: "none",
          }}
        />

        <AnimatedWords
          text={t("title")}
          style={{
            fontSize: "clamp(34px, 4.2vw, 54px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "16px",
            position: "relative",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
          style={{
            fontSize: "21px",
            color: "var(--muted)",
            marginBottom: "36px",
            position: "relative",
          }}
        >
          {t("desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.35 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: "inline-block", position: "relative" }}
        >
          <Button as={Link} href="/contact" variant="primary">
            {t("cta")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
