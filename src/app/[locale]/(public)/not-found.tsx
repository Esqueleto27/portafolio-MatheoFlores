import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <section style={{ padding: "100px clamp(20px, 6vw, 72px)" }}>
      <div
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

        <p
          style={{
            fontSize: "clamp(70px, 12vw, 140px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            margin: "0 0 8px",
            background: "linear-gradient(100deg, var(--accent) 0%, var(--accent-2) 60%, #93b4ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            position: "relative",
          }}
        >
          404
        </p>

        <h1
          style={{
            fontSize: "clamp(26px, 3.4vw, 38px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "16px",
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

        <div style={{ position: "relative" }}>
          <Button as={Link} href="/" variant="primary">
            {t("back")}
          </Button>
        </div>
      </div>
    </section>
  );
}
