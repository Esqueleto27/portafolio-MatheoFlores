import { FlaskConical } from "lucide-react";

export function DemoNotice({
  title,
  description,
  transitionDelay,
}: {
  title: string;
  description: string;
  transitionDelay: number;
}) {
  return (
    <div
      data-reveal
      style={{
        display: "flex",
        gap: "14px",
        padding: "18px 20px",
        borderRadius: "14px",
        border: "1px solid rgba(245, 158, 11, 0.35)",
        background: "rgba(245, 158, 11, 0.08)",
        marginBottom: "48px",
        transitionDelay: `${transitionDelay}s`,
      }}
    >
      <FlaskConical
        size={20}
        strokeWidth={2}
        color="#f59e0b"
        style={{ flexShrink: 0, marginTop: "2px" }}
        aria-hidden="true"
      />
      <div>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#f59e0b",
            fontFamily: "var(--font-geist-mono)",
            margin: "0 0 6px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "15px",
            color: "var(--soft)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
