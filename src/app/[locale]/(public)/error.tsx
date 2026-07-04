"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

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

        <div
          style={{
            position: "relative",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button variant="primary" onClick={reset}>
            {t("retry")}
          </Button>
          <Button as={Link} href="/" variant="secondary">
            {t("back")}
          </Button>
        </div>
      </div>
    </section>
  );
}
