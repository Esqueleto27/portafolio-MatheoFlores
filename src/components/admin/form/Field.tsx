export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--soft)",
          display: "block",
          marginBottom: hint ? "3px" : "7px",
        }}
      >
        {label}
      </label>
      {hint && (
        <p
          style={{
            fontSize: "11px",
            color: "var(--muted)",
            marginBottom: "7px",
            lineHeight: 1.4,
          }}
        >
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}
