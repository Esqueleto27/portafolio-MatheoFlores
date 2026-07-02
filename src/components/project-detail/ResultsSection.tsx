export function ResultsSection({
  title,
  content,
  transitionDelay,
}: {
  title: string;
  content?: string;
  transitionDelay: number;
}) {
  if (!content) return null;

  return (
    <div
      data-reveal
      style={{
        marginBottom: "48px",
        padding: "24px 28px",
        borderRadius: "14px",
        background: "var(--fill)",
        border: "1px solid var(--hair)",
        transitionDelay: `${transitionDelay}s`,
      }}
    >
      <h2
        style={{
          fontSize: "clamp(18px, 2vw, 22px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--accent)",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: "18px", color: "var(--text)", lineHeight: 1.6, margin: 0, maxWidth: "720px" }}>
        {content}
      </p>
    </div>
  );
}
