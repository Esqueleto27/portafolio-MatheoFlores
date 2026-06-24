import { type ReactNode, type CSSProperties } from "react";

/* ── Tech chip (for project technology tags) ───────────────────── */
export function TechChip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        fontSize: "11px",
        fontWeight: 500,
        color: "var(--muted)",
        padding: "3px 9px",
        borderRadius: "6px",
        background: "var(--fill2)",
        border: "1px solid var(--hair)",
        fontFamily: "var(--font-geist-mono)",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {children}
    </span>
  );
}

/* ── Service pill (blue accent, for project cards) ─────────────── */
export function ServicePill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 11px",
        borderRadius: "999px",
        background: "rgb(37 99 235 / 0.1)",
        border: "1px solid rgb(37 99 235 / 0.32)",
        fontSize: "11.5px",
        color: "var(--soft)",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "var(--accent)",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

/* ── Glass pill (hero area) ─────────────────────────────────────── */
export function GlassPill({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "7px 13px",
        borderRadius: "999px",
        background: "var(--fill2)",
        border: "1px solid var(--hair)",
        backdropFilter: "blur(8px)",
        fontSize: "13px",
        color: "var(--soft)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ── Available badge (green pulsing dot) ────────────────────────── */
export function AvailableBadge({ label }: { label: string }) {
  return (
    <GlassPill>
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--available-green)",
          boxShadow: "0 0 6px var(--available-glow)",
          animation: "mf-pulse 2.4s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      {label}
    </GlassPill>
  );
}
