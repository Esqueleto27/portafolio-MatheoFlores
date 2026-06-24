import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AvailableBadge, ServicePill } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "@/i18n/navigation";
import { getServices, getFeaturedProjects } from "@/lib/data";
import type { Service, Project, Locale } from "@/lib/mock-data";

export default async function Home() {
  const locale = (await getLocale()) as Locale;
  const [services, featuredProjects] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <HeroSection />
      <ServicesSection services={services} locale={locale} />
      <FeaturedProjectsSection projects={featuredProjects} locale={locale} />
      <WhyMeSection />
      <HowIWorkSection />
      <CtaSection />
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────────── */
function HeroSection() {
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
      {/* Background wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 60% at 64% 46%, rgb(37 99 235 / calc(var(--glow) * 0.4)) 0%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating geometric shapes */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { top: "16%", left: "5%", w: 90, h: 28, delay: "0s", dur: "13s" },
          { top: "66%", right: "6%", w: 80, h: 24, delay: "3s", dur: "14s" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: "left" in s ? s.left : undefined,
              right: "right" in s ? (s as { right: string }).right : undefined,
              width: s.w,
              height: s.h,
              borderRadius: "999px",
              background: `rgb(37 99 235 / calc(var(--glow) * 0.1))`,
              border: "1px solid rgb(37 99 235 / 0.2)",
              animation: `mf-float ${s.dur} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Grid content */}
      <div
        className="hero-grid"
        style={{
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.92fr 1.08fr",
          gap: "clamp(36px, 6vw, 84px)",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left — text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div data-reveal style={{ transitionDelay: "0.12s" }}>
            <AvailableBadge label={t("available")} />
          </div>

          <div data-reveal style={{ transitionDelay: "0.18s" }}>
            <h1
              style={{
                fontSize: "clamp(50px, 6.4vw, 88px)",
                fontWeight: 700,
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
                color: "var(--text)",
                margin: 0,
              }}
            >
              {t("name")}
            </h1>
            <p
              style={{
                fontSize: "clamp(11px, 1.1vw, 13px)",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--accent)",
                fontFamily: "var(--font-geist-mono)",
                margin: "14px 0 0",
              }}
            >
              {t("role")}
            </p>
          </div>

          <p
            data-reveal
            style={{
              fontSize: "clamp(16px, 1.5vw, 19px)",
              color: "var(--soft)",
              lineHeight: 1.55,
              maxWidth: "480px",
              margin: 0,
              transitionDelay: "0.28s",
            }}
          >
            {t("subtitle")}
          </p>

          <p
            data-reveal
            style={{
              fontSize: "15.5px",
              color: "var(--muted)",
              lineHeight: 1.65,
              maxWidth: "460px",
              margin: 0,
              transitionDelay: "0.36s",
            }}
          >
            {t("description")}
          </p>

          {/* Tech stack badges */}
          <div
            data-reveal
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              transitionDelay: "0.42s",
            }}
          >
            {["Next.js", "TypeScript", "PostgreSQL", "React"].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "4px 11px",
                  borderRadius: "6px",
                  background: "var(--fill2)",
                  border: "1px solid var(--hair)",
                  fontSize: "12px",
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--muted)",
                  letterSpacing: "0.02em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            data-reveal
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              transitionDelay: "0.50s",
            }}
          >
            <Button as={Link} href="/contact" variant="primary">
              {t("cta_primary")}
            </Button>
            <Button as={Link} href="/projects" variant="secondary">
              {t("cta_secondary")}
            </Button>
          </div>
        </div>

        {/* Right — photo */}
        <div
          className="hero-visual"
          data-reveal
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "560px",
            transitionDelay: "0.56s",
          }}
        >
          {/* Glow behind the photo */}
          <div
            aria-hidden="true"
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
              style={{
                objectFit: "contain",
                objectPosition: "center",
                transform: "scale(1.24)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────────────────────────── */
function ServicesSection({
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
        {/* Label */}
        <p
          data-reveal
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "12px",
          }}
        >
          {t("section_label")}
        </p>

        <h2
          data-reveal
          style={{
            fontSize: "clamp(30px, 3.8vw, 46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "12px",
            transitionDelay: "0.08s",
          }}
        >
          {t("section_title")}
        </h2>

        <p
          data-reveal
          style={{
            fontSize: "17px",
            color: "var(--muted)",
            marginBottom: "48px",
            transitionDelay: "0.14s",
          }}
        >
          {t("section_desc")}
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
            gap: "22px",
          }}
        >
          {services.map((service, i) => {
            const name = locale === "en" ? service.name_en : service.name_es;
            const desc =
              locale === "en" ? service.description_en : service.description_es;

            return (
              <div
                key={service.id}
                data-reveal
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--hair)",
                  background: "var(--card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transitionDelay: `${i * 0.06}s`,
                }}
              >
                <ServicePill>{name}</ServicePill>
                <p
                  style={{
                    fontSize: "14.5px",
                    color: "var(--muted)",
                    lineHeight: 1.55,
                    margin: 0,
                    flex: 1,
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Featured projects ───────────────────────────────────────────── */
function FeaturedProjectsSection({
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
        <p
          data-reveal
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "12px",
          }}
        >
          {t("section_label")}
        </p>

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
          <h2
            data-reveal
            style={{
              fontSize: "clamp(30px, 3.8vw, 46px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              margin: 0,
              transitionDelay: "0.08s",
            }}
          >
            {t("section_title")}
          </h2>

          <Button
            as={Link}
            href="/projects"
            variant="secondary"
            size="compact"
          >
            {t("view_all")} →
          </Button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "34px",
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-reveal
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <ProjectCard
                project={project}
                locale={locale}
                viewCaseLabel={t("view_case")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Why me ──────────────────────────────────────────────────────── */
function WhyMeSection() {
  const t = useTranslations("why_me");

  const items = [
    {
      num: "01",
      title: t("item1_title"),
      desc: t("item1_desc"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      num: "02",
      title: t("item2_title"),
      desc: t("item2_desc"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      num: "03",
      title: t("item3_title"),
      desc: t("item3_desc"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      num: "04",
      title: t("item4_title"),
      desc: t("item4_desc"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ] as const;

  return (
    <section style={{ padding: "80px clamp(20px, 6vw, 72px)" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <p
          data-reveal
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "12px",
          }}
        >
          {t("section_label")}
        </p>

        <h2
          data-reveal
          style={{
            fontSize: "clamp(30px, 3.8vw, 46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "48px",
            transitionDelay: "0.08s",
          }}
        >
          {t("section_title")}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.num}
              data-reveal
              style={{
                padding: "28px 24px",
                borderRadius: "16px",
                border: "1px solid var(--hair)",
                background: "var(--card)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <div
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
              </div>
              <h3
                style={{
                  fontSize: "16px",
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
                  fontSize: "14.5px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How I work ─────────────────────────────────────────────────── */
function HowIWorkSection() {
  const t = useTranslations("how_i_work");

  const steps = [
    { num: "01", title: t("step1_title"), desc: t("step1_desc") },
    { num: "02", title: t("step2_title"), desc: t("step2_desc") },
    { num: "03", title: t("step3_title"), desc: t("step3_desc") },
    { num: "04", title: t("step4_title"), desc: t("step4_desc") },
  ];

  return (
    <section
      id="process"
      style={{
        padding: "80px clamp(20px, 6vw, 72px)",
        background: "var(--bg2)",
        scrollMarginTop: "96px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p
          data-reveal
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "12px",
          }}
        >
          {t("section_label")}
        </p>

        <h2
          data-reveal
          style={{
            fontSize: "clamp(30px, 3.8vw, 46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "48px",
            transitionDelay: "0.08s",
          }}
        >
          {t("section_title")}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              data-reveal
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "24px",
                padding: "28px 0",
                borderBottom:
                  i < steps.length - 1 ? "1px solid var(--hair)" : "none",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  fontWeight: 600,
                  color: "var(--accent)",
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  style={{
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 600,
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                    marginBottom: "8px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "16.5px",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA banner ──────────────────────────────────────────────────── */
function CtaSection() {
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
        {/* Glow */}
        <div
          aria-hidden="true"
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

        <h2
          style={{
            fontSize: "clamp(30px, 3.8vw, 46px)",
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
            fontSize: "18px",
            color: "var(--muted)",
            marginBottom: "36px",
            position: "relative",
          }}
        >
          {t("desc")}
        </p>

        <Button
          as={Link}
          href="/contact"
          variant="primary"
          style={{ position: "relative" }}
        >
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
