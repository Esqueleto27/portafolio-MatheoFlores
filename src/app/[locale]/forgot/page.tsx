import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export default function ForgotPage() {
  const t = useTranslations("forgot");

  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px clamp(20px, 6vw, 72px)",
      }}
    >
      <div
        data-reveal
        style={{
          maxWidth: "500px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: "180%",
            background:
              "radial-gradient(ellipse at center top, rgb(37 99 235 / calc(var(--glow) * 0.6)), transparent 60%)",
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
            marginBottom: "16px",
            position: "relative",
          }}
        >
          {t("title")}
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "var(--muted)",
            lineHeight: 1.6,
            marginBottom: "36px",
            position: "relative",
          }}
        >
          {t("desc")}
        </p>

        <Button
          as={Link}
          href="/"
          variant="secondary"
          style={{ position: "relative" }}
        >
          {t("back")}
        </Button>
      </div>
    </section>
  );
}
