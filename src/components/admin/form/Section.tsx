export function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "28px 0", borderBottom: "1px solid var(--hair)" }}>
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-geist-mono)",
          marginBottom: "18px",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
