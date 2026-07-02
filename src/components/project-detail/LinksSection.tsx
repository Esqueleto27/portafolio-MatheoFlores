import { Button } from "@/components/ui/Button";

export function LinksSection({
  liveUrl,
  githubUrl,
  videoUrl,
  liveLabel,
  githubLabel,
  videoLabel,
  transitionDelay,
}: {
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  liveLabel: string;
  githubLabel: string;
  videoLabel: string;
  transitionDelay: number;
}) {
  if (!liveUrl && !githubUrl && !videoUrl) return null;

  return (
    <div
      data-reveal
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        transitionDelay: `${transitionDelay}s`,
      }}
    >
      {liveUrl && (
        <Button as="a" href={liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
          {liveLabel} ↗
        </Button>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
          style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)" }}
        >
          {githubLabel} ↗
        </a>
      )}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
          style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)" }}
        >
          {videoLabel} ↗
        </a>
      )}
    </div>
  );
}
