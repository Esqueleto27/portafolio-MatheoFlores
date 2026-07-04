"use client";

import { useEffect } from "react";

// Only fires if the root layout itself throws (very rare) — must render its
// own <html>/<body> since it replaces the root layout entirely when active.
// Kept intentionally minimal: no design-system dependencies, since whatever
// broke the root layout could break those too.
export default function GlobalError({
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
    <html lang="es">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "12px" }}>
            Algo salió mal
          </h1>
          <p style={{ color: "#a1a1aa", marginBottom: "28px" }}>
            Ocurrió un error inesperado. Intenta de nuevo en unos momentos.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
