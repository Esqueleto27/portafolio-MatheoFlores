"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { signIn } from "@/lib/auth";

// This admin login is Spanish-only and lives outside the /es, /en locale
// routes — hardcoded strings instead of next-intl, since there's no
// audience here that needs English.
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const result = await signIn(email, password);
      if (result.error) {
        // Supabase errors come back in English ("Invalid login credentials") —
        // show a translated generic message instead of the raw text.
        setError("No se pudo iniciar sesión. Verifica el correo y la contraseña.");
        setLoading(false);
        return;
      }
      router.replace("/admin");
    } catch {
      // Network failure or unexpected client error — signIn() itself
      // shouldn't throw, but a stuck spinner is worse than a generic message.
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

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
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 3.8vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          Acceso restringido
        </h1>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="login-email"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--soft)",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Correo electrónico
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                fontFamily: "var(--font-geist-sans)",
                color: "var(--text)",
                background: "var(--fill)",
                border: "1px solid var(--hair)",
                borderRadius: "12px",
                outline: "none",
                boxSizing: "border-box" as const,
                opacity: loading ? 0.6 : 1,
              }}
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--soft)",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Contraseña
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "15px",
                fontFamily: "var(--font-geist-sans)",
                color: "var(--text)",
                background: "var(--fill)",
                border: "1px solid var(--hair)",
                borderRadius: "12px",
                outline: "none",
                boxSizing: "border-box" as const,
                opacity: loading ? 0.6 : 1,
              }}
            />
          </div>
          {error && (
            <p role="alert" style={{ color: "#ef4444", fontSize: "13px", margin: 0 }}>
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            style={{ width: "100%" }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/forgot" className="link-accent" style={{ fontSize: "13px" }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </section>
  );
}
