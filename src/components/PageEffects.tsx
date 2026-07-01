"use client";

import { useEffect, useRef } from "react";

/* Tiny canvas particle system — 40 dots, very lightweight */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = document.body.scrollHeight;
    canvas.width = W;
    canvas.height = H;

    const COUNT = 48;
    type Dot = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; da: number };
    const dots: Dot[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.35 + 0.08,
      da: (Math.random() - 0.5) * 0.002,
    }));

    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        d.alpha += d.da;
        if (d.alpha < 0.05) d.da = Math.abs(d.da);
        if (d.alpha > 0.4) d.da = -Math.abs(d.da);
        if (d.x < 0) d.x = W;
        if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,140,255,${d.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    draw();

    function onResize() {
      if (!canvas) return;
      W = window.innerWidth;
      H = document.body.scrollHeight;
      canvas.width = W;
      canvas.height = H;
    }
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}

/* Large blurred ambient orbs — CSS only, zero JS */
function AmbientOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Top-left orb */}
      <div
        style={{
          position: "absolute",
          top: "-15vh",
          left: "-10vw",
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgb(37 99 235 / calc(var(--glow) * 0.22)) 0%, transparent 68%)",
          filter: "blur(80px)",
          animation: "mf-orb-drift-1 22s ease-in-out infinite",
        }}
      />
      {/* Bottom-right orb */}
      <div
        style={{
          position: "absolute",
          bottom: "-20vh",
          right: "-12vw",
          width: "60vw",
          height: "60vw",
          maxWidth: "760px",
          maxHeight: "760px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgb(91 140 255 / calc(var(--glow) * 0.18)) 0%, transparent 65%)",
          filter: "blur(100px)",
          animation: "mf-orb-drift-2 28s ease-in-out infinite",
        }}
      />
      {/* Mid accent orb */}
      <div
        style={{
          position: "absolute",
          top: "40vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40vw",
          height: "40vw",
          maxWidth: "500px",
          maxHeight: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgb(37 99 235 / calc(var(--glow) * 0.1)) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "mf-orb-drift-3 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* Grain / noise overlay — SVG turbulence */
function Grain() {
  return (
    <>
      <svg style={{ display: "none" }} aria-hidden="true">
        <filter id="mf-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9996,
          opacity: 0.022,
          filter: "url(#mf-noise)",
          background: "rgba(255,255,255,1)",
        }}
      />
    </>
  );
}

/* Subtle scanning line that sweeps every 12s */
function ScanLine() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background:
          "linear-gradient(90deg, transparent 0%, rgba(91,140,255,0.35) 30%, rgba(37,99,235,0.5) 50%, rgba(91,140,255,0.35) 70%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 9995,
        animation: "mf-scan-line 12s ease-in-out infinite",
        animationDelay: "3s",
      }}
    />
  );
}

export function PageEffects() {
  return (
    <>
      <AmbientOrbs />
      <Particles />
      <Grain />
    </>
  );
}
