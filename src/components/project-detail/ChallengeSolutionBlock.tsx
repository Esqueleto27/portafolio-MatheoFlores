const HEADING_STYLE: React.CSSProperties = {
  fontSize: "clamp(18px, 2vw, 22px)",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  color: "var(--accent)",
  margin: 0,
};

const PARAGRAPH_STYLE: React.CSSProperties = {
  fontSize: "17px",
  lineHeight: 1.7,
  margin: 0,
};

export function ChallengeSolutionBlock({
  objective,
  problem,
  solution,
  objectiveLabel,
  solutionLabel,
  transitionDelay,
}: {
  objective?: string;
  problem: string;
  solution: string;
  objectiveLabel: string;
  solutionLabel: string;
  transitionDelay: number;
}) {
  return (
    <div
      data-reveal
      className="grid-cols-2-mobile"
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: "34px",
        marginBottom: "48px",
        transitionDelay: `${transitionDelay}s`,
      }}
    >
      <h2 style={HEADING_STYLE}>{objectiveLabel}</h2>
      <div>
        {objective && (
          <p style={{ ...PARAGRAPH_STYLE, color: "var(--text)", fontWeight: 500, marginBottom: "10px" }}>
            {objective}
          </p>
        )}
        <p style={{ ...PARAGRAPH_STYLE, color: "var(--muted)" }}>{problem}</p>
      </div>

      <h2 style={HEADING_STYLE}>{solutionLabel}</h2>
      <p style={{ ...PARAGRAPH_STYLE, color: "var(--soft)" }}>{solution}</p>
    </div>
  );
}
