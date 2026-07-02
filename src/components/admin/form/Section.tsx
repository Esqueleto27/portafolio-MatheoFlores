export function Section({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "24px",
        marginBottom: "22px",
        border: "1px solid var(--hair)",
        borderRadius: "14px",
        background: "var(--fill)",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--accent)",
          fontFamily: "var(--font-geist-mono)",
          marginBottom: hint ? "4px" : "20px",
        }}
      >
        {label}
      </p>
      {hint && (
        <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px", lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}
