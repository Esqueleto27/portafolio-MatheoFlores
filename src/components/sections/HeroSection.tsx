"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1
      style={{
        fontSize: "clamp(42px, 11vw, 124px)",
        fontWeight: 800,
        lineHeight: 0.98,
        letterSpacing: "-0.04em",
        color: "var(--text)",
        margin: 0,
        perspective: "600px",
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.22em",
            animation: "mf-word-in 0.52s cubic-bezier(0.25, 0.4, 0.25, 1) both",
            animationDelay: `${i * 0.13}s`,
          }}
        >
          {word}
        </span>
      ))}
    </h1>
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
        background: `
          radial-gradient(38% 36% at 22% 50%, rgb(37 99 235 / calc(var(--glow) * 0.14)) 0%, transparent 100%),
          radial-gradient(48% 40% at 76% 48%, rgb(59 130 246 / calc(var(--glow) * 0.11)) 0%, transparent 100%),
          radial-gradient(30% 28% at 50% 12%, rgb(37 99 235 / calc(var(--glow) * 0.08)) 0%, transparent 100%),
          var(--bg)
        `,
      }}
    >
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
            <p
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
                animation: "mf-blur-up 0.7s cubic-bezier(0.25, 0.4, 0.25, 1) 0.42s both",
              }}
            >
              {t("role")}
            </p>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(17px, 1.6vw, 20px)",
              color: "var(--muted)",
              lineHeight: 1.65,
              maxWidth: "460px",
              margin: 0,
              animation: "mf-fade-up 0.7s cubic-bezier(0.25, 0.4, 0.25, 1) 0.54s both",
            }}
          >
            {t("subtitle")}
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {[
              { href: "/contact", variant: "primary" as const, label: t("cta_primary") },
              { href: "/projects", variant: "secondary" as const, label: t("cta_secondary") },
            ].map(({ href, variant, label }, i) => (
              <div
                key={href}
                className="hero-btn-scale"
                style={{
                  animation: "mf-fade-up 0.5s cubic-bezier(0.25, 0.4, 0.25, 1) both",
                  animationDelay: `${0.72 + i * 0.1}s`,
                }}
              >
                <Button as={Link} href={href} variant={variant}>
                  {label}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo */}
        <div
          className="hero-visual"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "560px",
            animation: "mf-hero-photo-in 0.9s cubic-bezier(0.16, 0.9, 0.3, 1) 0.2s both",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "160%",
              height: "160%",
              left: "-30%",
              top: "-30%",
              background:
                "radial-gradient(44% 44% at 50% 48%, rgb(37 99 235 / calc(var(--glow) * 1)) 0%, rgb(37 99 235 / calc(var(--glow) * 0.3)) 30%, transparent 68%)",
              filter: "blur(80px)",
              pointerEvents: "none",
              animation: "mf-glow-fade 4s ease-in-out infinite",
            }}
          />

          <div
            style={{
              position: "relative",
              width: "min(100%, 680px)",
              aspectRatio: "1/1",
              maskImage: "radial-gradient(ellipse 72% 66% at 50% 48%, #000 42%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 72% 66% at 50% 48%, #000 42%, transparent 78%)",
            }}
          >
            <Image
              src="/svg-matheo-azul-portafolio.webp"
              alt="Matheo Flores"
              fill
              priority
              sizes="(max-width: 980px) 90vw, 680px"
              style={{ objectFit: "contain", objectPosition: "center", transform: "scale(1.42) translateY(-14px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
