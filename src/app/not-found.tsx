export default function RootNotFound() {
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
        <p
          style={{
            fontSize: "clamp(70px, 12vw, 140px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            margin: "0 0 8px",
            color: "var(--accent-2)",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: "28px",
          }}
        >
          Página no encontrada
        </h1>
        <a
          href="/"
          className="btn-primary"
          style={{ display: "inline-flex" }}
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}
