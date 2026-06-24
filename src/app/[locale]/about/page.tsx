import type { Metadata } from "next";
import { useTranslations } from "next-intl";

const STACK_ITEMS = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "Tailwind CSS", "Supabase", "Framer Motion", "Stripe",
  "Git", "Docker", "REST APIs", "GraphQL", "Prisma",
  "Python", "Figma", "Vercel", "Cloudflare",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "About" : "Sobre mí",
    description:
      locale === "en"
        ? "Full-stack web developer from Quito, Ecuador. I handle everything: domain, design, code, SEO and launch."
        : "Desarrollador web full-stack de Quito, Ecuador. Me encargo de todo: dominio, diseño, código, SEO y lanzamiento.",
  };
}

export default async function AboutPage() {
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <section
      style={{
        padding: "60px clamp(20px, 6vw, 72px) 100px",
      }}
    >
      <div
        style={{
          maxWidth: "min(1080px, 100%)",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header */}
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
          {t("section_title")}
        </p>

        <h1
          data-reveal
          style={{
            fontSize: "clamp(34px, 4.6vw, 60px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            color: "var(--text)",
            lineHeight: 1.05,
            marginBottom: "32px",
            transitionDelay: "0.1s",
          }}
        >
          {t("intro_title")}
        </h1>

        {/* Intro */}
        <div data-reveal style={{ maxWidth: "720px", transitionDelay: "0.18s" }}>
          <p
            style={{
              fontSize: "17px",
              color: "var(--soft)",
              lineHeight: 1.7,
              marginBottom: "20px",
            }}
          >
            {t("intro_desc_1")}
          </p>
          <p
            style={{
              fontSize: "17px",
              color: "var(--muted)",
              lineHeight: 1.7,
              marginBottom: "56px",
            }}
          >
            {t("intro_desc_2")}
          </p>
        </div>

        {/* Approach */}
        <div
          data-reveal
          style={{
            padding: "32px",
            borderRadius: "18px",
            border: "1px solid var(--hair)",
            background: "var(--card)",
            marginBottom: "80px",
            transitionDelay: "0.26s",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--accent)",
              marginBottom: "12px",
            }}
          >
            {t("approach_title")}
          </h2>
          <p
            style={{
              fontSize: "16.5px",
              color: "var(--muted)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {t("approach_desc")}
          </p>
        </div>

        {/* Marquee: Mi stack */}
        <div data-reveal style={{ transitionDelay: "0.34s" }}>
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
          <p
            style={{
              fontSize: "14.5px",
              color: "var(--muted)",
              marginBottom: "28px",
            }}
          >
            {t("stack_desc")}
          </p>

          <div
            className="marquee-container"
            style={{
              overflow: "hidden",
              maskImage:
                "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    background: "var(--fill2)",
                    border: "1px solid var(--hair)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--soft)",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-geist-mono)",
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
