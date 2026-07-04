"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export function CtaSection() {
  const t = useTranslations("cta_section");

  return (
    <section style={{ padding: "80px clamp(20px, 6vw, 72px)" }}>
      <div
        data-reveal
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
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-60%",
            left: "50%",
            width: "60%",
            height: "200%",
            background:
              "radial-gradient(ellipse at center top, rgb(37 99 235 / calc(var(--glow) * 0.95)), transparent 60%)",
            filter: "blur(44px)",
            pointerEvents: "none",
            animation: "mf-glow-pulse 3.5s ease-in-out infinite",
          }}
        />

        {/* Secondary ring glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "1px solid rgb(37 99 235 / 0.15)",
            pointerEvents: "none",
            animation: "mf-ring-pulse 4.5s ease-in-out infinite 1s",
          }}
        />

        <h2
          style={{
            fontSize: "clamp(34px, 4.2vw, 54px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "16px",
            position: "relative",
          }}
        >
          {t("title")}
        </h2>

        <p
          style={{
            fontSize: "21px",
            color: "var(--muted)",
            marginBottom: "36px",
            position: "relative",
          }}
        >
          {t("desc")}
        </p>

        <div style={{ display: "inline-block", position: "relative" }}>
          <Button as={Link} href="/contact" variant="primary">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
