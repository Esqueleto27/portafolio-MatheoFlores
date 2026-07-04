import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Spanish-only, lives outside the /es, /en locale routes.
export default function ForgotPage() {
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
          ¿En serio?
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
          Esta área es solo para Matheo. Si no eres Matheo, no hay nada que ver acá. 😉
        </p>

        <Button
          as={Link}
          href="/"
          variant="secondary"
          style={{ position: "relative" }}
        >
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}
