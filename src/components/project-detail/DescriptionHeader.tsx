export function DescriptionHeader({
  description,
  transitionDelay,
}: {
  description?: string;
  transitionDelay: number;
}) {
  if (!description) return null;

  return (
    <p
      data-reveal
      style={{
        fontSize: "clamp(17px, 1.8vw, 21px)",
        color: "var(--soft)",
        lineHeight: 1.6,
        maxWidth: "720px",
        marginBottom: "48px",
        transitionDelay: `${transitionDelay}s`,
      }}
    >
      {description}
    </p>
  );
}
