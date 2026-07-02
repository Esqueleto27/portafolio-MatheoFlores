"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { wordReveal, staggerContainer } from "@/components/animations";

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      variants={staggerContainer(0.13, 0)}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: "clamp(72px, 9vw, 124px)",
        fontWeight: 800,
        lineHeight: 0.92,
        letterSpacing: "-0.05em",
        color: "var(--text)",
        margin: 0,
        perspective: "600px",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          style={{ display: "inline-block", marginRight: "0.22em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        padding: "90px clamp(20px, 6vw, 72px) 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--hair) 1px, transparent 1px), linear-gradient(90deg, var(--hair) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%)",
          pointerEvents: "none",
          opacity: 0.45,
        }}
      />

      {/* Radial glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 60% at 64% 46%, rgb(37 99 235 / calc(var(--glow) * 0.4)) 0%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Content grid */}
      <div
        className="hero-grid"
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(36px, 6vw, 80px)",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left — text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Name */}
          <div>
            <AnimatedTitle text={t("name")} />

            {/* Role — big gradient accent */}
            <motion.p
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.42 }}
              style={{
                fontSize: "clamp(22px, 2.6vw, 36px)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                margin: "16px 0 0",
                background: "linear-gradient(100deg, var(--accent) 0%, var(--accent-2) 60%, #93b4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.2,
              }}
            >
              {t("role")}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.54 }}
            style={{
              fontSize: "clamp(17px, 1.6vw, 20px)",
              color: "var(--muted)",
              lineHeight: 1.65,
              maxWidth: "460px",
              margin: 0,
            }}
          >
            {t("subtitle")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={staggerContainer(0.1, 0.72)}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
          >
            {[
              { href: "/contact", variant: "primary" as const, label: t("cta_primary") },
              { href: "/projects", variant: "secondary" as const, label: t("cta_secondary") },
            ].map(({ href, variant, label }) => (
              <motion.div
                key={href}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 220, damping: 20 },
                  },
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button as={Link} href={href} variant={variant}>
                  {label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 60, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.2 }}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "560px",
          }}
        >
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "120%",
              height: "116%",
              left: "-8%",
              top: "-6%",
              background:
                "radial-gradient(46% 52% at 50% 46%, rgb(37 99 235 / calc(var(--glow) * 0.85)) 0%, rgb(37 99 235 / calc(var(--glow) * 0.32)) 40%, transparent 72%)",
              filter: "blur(54px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              width: "min(100%, 680px)",
              aspectRatio: "1/1",
              maskImage: "linear-gradient(to bottom, #000 60%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 95%)",
              filter: `drop-shadow(0 24px 60px rgb(37 99 235 / calc(var(--glow)*0.45)))`,
            }}
          >
            <Image
              src="/svg-matheo-azul-portafolio.png"
              alt="Matheo Flores"
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "center", transform: "scale(1.24)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
