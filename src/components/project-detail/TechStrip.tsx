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
    <div data-reveal style={{ marginBottom: "40px", transitionDelay: `${transitionDelay}s` }}>
      <h3
        style={{
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-geist-mono)",
          marginBottom: "14px",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {technologies.map((tech) => (
          <TechChip
            key={tech}
            style={{ fontSize: "16px", padding: "9px 18px", borderRadius: "9px" }}
          >
            {tech}
          </TechChip>
        ))}
      </div>
    </div>
  );
}
