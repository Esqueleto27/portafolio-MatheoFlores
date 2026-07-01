"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let tx = -600;
    let ty = -600;
    let cx = -600;
    let cy = -600;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }

    function tick() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cx - 350}px, ${cy - 350}px)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgb(37 99 235 / 0.055) 0%, transparent 68%)",
        pointerEvents: "none",
        zIndex: 9997,
        willChange: "transform",
      }}
    />
  );
}
