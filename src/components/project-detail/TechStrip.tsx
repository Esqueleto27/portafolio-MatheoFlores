import { TechChip } from "@/components/ui/Badge";

export function TechStrip({
  technologies,
  title,
  transitionDelay,
}: {
  technologies: string[];
  title: string;
  transitionDelay: number;
}) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div data-reveal style={{ marginBottom: "32px", transitionDelay: `${transitionDelay}s` }}>
      <h3
        style={{
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-geist-mono)",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {technologies.map((tech) => (
          <TechChip key={tech}>{tech}</TechChip>
        ))}
      </div>
    </div>
  );
}
