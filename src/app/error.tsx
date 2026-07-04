"use client";

import { useEffect } from "react";
import Link from "next/link";

// Catches errors in /admin, /login, /forgot — the Spanish-only area outside
// the /es, /en locale routes, so no next-intl here (matches src/app/not-found.tsx).
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: "12px",
          }}
        >
          Algo salió mal
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "28px" }}>
          Ocurrió un error inesperado. Intenta de nuevo en unos momentos.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            className="btn-primary"
            style={{ border: "none", cursor: "pointer" }}
          >
            Reintentar
          </button>
          <Link href="/" className="btn-secondary" style={{ display: "inline-flex" }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
