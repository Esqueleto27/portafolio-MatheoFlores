export function ChallengesSection({
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
    <div data-reveal style={{ marginBottom: "48px", transitionDelay: `${transitionDelay}s` }}>
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
      <p style={{ fontSize: "17px", color: "var(--muted)", lineHeight: 1.7, margin: 0, maxWidth: "720px" }}>
        {content}
      </p>
    </div>
  );
}
