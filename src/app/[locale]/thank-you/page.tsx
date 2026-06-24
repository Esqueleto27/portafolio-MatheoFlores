import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Message sent" : "Mensaje enviado",
    robots: { index: false, follow: false },
  };
}

export default function ThankYouPage() {
  const t = useTranslations("thank_you");

  return (
    <section
      style={{
        padding: "100px clamp(20px, 6vw, 72px)",
      }}
    >
      <div
        data-reveal
        style={{
          maxWidth: "min(720px, 100%)",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
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
              "radial-gradient(ellipse at center top, rgb(37 99 235 / calc(var(--glow) * 0.7)), transparent 60%)",
            filter: "blur(44px)",
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            fontSize: "clamp(34px, 4.6vw, 60px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            color: "var(--text)",
            lineHeight: 1.05,
            marginBottom: "20px",
            position: "relative",
          }}
        >
          {t("title")}
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "var(--muted)",
            lineHeight: 1.6,
            marginBottom: "40px",
            position: "relative",
          }}
        >
          {t("desc")}
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <Button as={Link} href="/" variant="primary">
            {t("back")}
          </Button>
          <Button as={Link} href="/projects" variant="secondary">
            {t("see_projects")}
          </Button>
        </div>
      </div>
    </section>
  );
}
