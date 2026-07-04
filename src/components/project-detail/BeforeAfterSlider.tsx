"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  /** Above-the-fold usage (e.g. the main project preview) skips lazy-loading. */
  eager?: boolean;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeLabel,
  afterLabel,
  alt,
  eager,
}: BeforeAfterSliderProps) {
  const [percent, setPercent] = useState(50);
  const rootRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function updateFromClientX(clientX: number) {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(clamp(pct, 0, 100));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPercent((p) => clamp(p - 5, 0, 100));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPercent((p) => clamp(p + 5, 0, 100));
    }
  }

  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontFamily: "var(--font-geist-mono)",
    pointerEvents: "none",
    zIndex: 1,
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        cursor: "ew-resize",
        touchAction: "none",
      }}
    >
      {/* After — full bleed, always visible */}
      <Image
        src={afterUrl}
        alt={alt}
        fill
        priority={eager}
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, 680px"
        style={{ objectFit: "cover" }}
      />

      {/* Before — same full-bleed image, clipped by percent */}
      <Image
        src={beforeUrl}
        alt={alt}
        fill
        priority={eager}
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, 680px"
        style={{ objectFit: "cover", clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      />

      <span style={{ ...badgeStyle, left: "10px" }}>{beforeLabel}</span>
      <span style={{ ...badgeStyle, right: "10px" }}>{afterLabel}</span>

      {/* Divider line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${percent}%`,
          width: "2px",
          background: "#fff",
          transform: "translateX(-1px)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
          pointerEvents: "none",
        }}
      />

      {/* Drag handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        style={{
          position: "absolute",
          top: "50%",
          left: `${percent}%`,
          transform: "translate(-50%, -50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "var(--fill2)",
          border: "2px solid #fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "ew-resize",
          zIndex: 2,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" transform="translate(-3, 0)" />
          <polyline points="9 18 15 12 9 6" transform="translate(3, 0)" />
        </svg>
      </div>
    </div>
  );
}
