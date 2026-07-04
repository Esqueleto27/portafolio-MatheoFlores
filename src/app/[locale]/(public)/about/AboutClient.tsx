"use client";

import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/SocialLinks";

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

        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "12px",
            animation: "mf-fade-up 0.6s cubic-bezier(0.25, 0.4, 0.25, 1) both",
          }}
        >
          {t("section_title")}
        </p>

        {/* Profile hero: photo + quick facts | name + bio */}
        <div
          className="grid-cols-2-mobile"
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "clamp(28px, 5vw, 56px)",
            alignItems: "start",
            marginBottom: "56px",
          }}
        >
          {/* Photo + quick facts */}
          <div
            style={{
              animation: "mf-scale-up 0.75s cubic-bezier(0.25, 0.4, 0.25, 1) 0.06s both",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "220px",
                aspectRatio: "1",
                borderRadius: "20px",
                overflow: "hidden",
                border: "2px solid var(--hair)",
                marginBottom: "20px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/matheo-avatar.webp"
                alt={t("avatar_alt")}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              <span style={{ fontSize: "15px", color: "var(--soft)" }}>{t("location")}</span>
              <span style={{ fontSize: "15px", color: "var(--muted)" }}>{t("availability")}</span>
            </div>

            <p
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                marginBottom: "10px",
              }}
            >
              {t("find_me_title")}
            </p>
            <SocialLinks size={44} />
          </div>

          {/* Name + role + bio */}
          <div>
            <h1
              style={{
                fontSize: "clamp(32px, 4.2vw, 52px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--text)",
                lineHeight: 1.08,
                marginBottom: "8px",
                animation: "mf-blur-up 0.8s cubic-bezier(0.25, 0.4, 0.25, 1) 0.08s both",
              }}
            >
              {t("name")}
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.8vw, 19px)",
                fontWeight: 500,
                color: "var(--accent)",
                marginBottom: "24px",
                animation: "mf-fade-up 0.7s cubic-bezier(0.25, 0.4, 0.25, 1) 0.14s both",
              }}
            >
              {t("role")}
            </p>

            <h2
              style={{
                fontSize: "clamp(20px, 2.6vw, 28px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                lineHeight: 1.3,
                marginBottom: "24px",
                animation: "mf-fade-up 0.75s cubic-bezier(0.25, 0.4, 0.25, 1) 0.2s both",
              }}
            >
              {t("intro_title")}
            </h2>

            <div
              style={{
                animation: "mf-fade-up 0.75s cubic-bezier(0.25, 0.4, 0.25, 1) 0.26s both",
              }}
            >
              <p style={{ fontSize: "18px", color: "var(--soft)", lineHeight: 1.7, marginBottom: "18px" }}>
                {t("intro_desc_1")}
              </p>
              <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.7 }}>
                {t("intro_desc_2")}
              </p>
            </div>
          </div>
        </div>

        {/* Approach card */}
        <div
          className="approach-card-hover"
          style={{
            padding: "32px",
            borderRadius: "18px",
            border: "1px solid var(--hair)",
            background: "var(--card)",
            marginBottom: "80px",
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            animation: "mf-scale-up 0.75s cubic-bezier(0.25, 0.4, 0.25, 1) 0.28s both",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-40%",
              right: "-10%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgb(37 99 235 / 0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              animation: "mf-glow-fade-soft 4s ease-in-out infinite",
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
        </div>

        {/* Stack marquee */}
        <div data-reveal>
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
                <span
                  key={`${item}-${i}`}
                  className="marquee-item-hover"
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
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
