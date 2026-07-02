import { Button } from "@/components/ui/Button";

export function LinksSection({
  liveUrl,
  githubUrl,
  showCode = true,
  videoUrl,
  liveLabel,
  githubLabel,
  codeUnavailableLabel,
  videoLabel,
  transitionDelay,
}: {
  liveUrl?: string;
  githubUrl?: string;
  showCode?: boolean;
  videoUrl?: string;
  liveLabel: string;
  githubLabel: string;
  codeUnavailableLabel: string;
  videoLabel: string;
  transitionDelay: number;
}) {
  const showCodeLink = showCode && !!githubUrl;
  const showCodeUnavailable = !showCode;

  if (!liveUrl && !showCodeLink && !showCodeUnavailable && !videoUrl) return null;

  return (
    <div
      data-reveal
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        transitionDelay: `${transitionDelay}s`,
      }}
    >
      {liveUrl && (
        <Button
          as="a"
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          style={{ padding: "19px 44px", fontSize: "17px" }}
        >
          {liveLabel} ↗
        </Button>
      )}
      {(showCodeLink || showCodeUnavailable || videoUrl) && (
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          {showCodeLink && (
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
          {showCodeUnavailable && (
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)" }}>
              {codeUnavailableLabel}
            </span>
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
      )}
    </div>
  );
}
