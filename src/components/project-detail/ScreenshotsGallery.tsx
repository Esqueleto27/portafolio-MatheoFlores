import type { Screenshot } from "@/lib/mock-data";

const CARD_BASE: React.CSSProperties = {
  borderRadius: "18px",
  background: "var(--mockup)",
  border: "1px solid var(--hair)",
  overflow: "hidden",
  position: "relative",
};

function ShotCard({ shot, muted }: { shot: Screenshot; muted?: boolean }) {
  const isMobile = shot.device === "mobile";
  return (
    <div
      style={{
        ...CARD_BASE,
        flex: isMobile ? "0 1 220px" : "1 1 460px",
        aspectRatio: isMobile ? "9/16" : "16/9",
        filter: muted ? "grayscale(1) brightness(0.85)" : undefined,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.url}
        alt={shot.label_es ?? ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
}

export function ScreenshotsGallery({
  screenshots,
  title,
  beforeLabel,
  afterLabel,
  transitionDelay,
}: {
  screenshots: Screenshot[];
  title: string;
  beforeLabel: string;
  afterLabel: string;
  transitionDelay: number;
}) {
  if (!screenshots || screenshots.length === 0) return null;

  const before = screenshots.filter((s) => s.kind === "before");
  const after = screenshots.filter((s) => s.kind === "after");

  return (
    <div data-reveal style={{ marginBottom: "56px", transitionDelay: `${transitionDelay}s` }}>
      <h2
        style={{
          fontSize: "clamp(18px, 2vw, 22px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--accent)",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      {before.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
              marginBottom: "10px",
            }}
          >
            {beforeLabel}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {before.map((shot, i) => (
              <ShotCard key={i} shot={shot} muted />
            ))}
          </div>
        </div>
      )}

      {after.length > 0 && (
        <div>
          {before.length > 0 && (
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                marginBottom: "10px",
              }}
            >
              {afterLabel}
            </p>
          )}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {after.map((shot, i) => (
              <ShotCard key={i} shot={shot} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
