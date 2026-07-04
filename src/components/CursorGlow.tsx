"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotionPreference(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getEnabled() {
  return !window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// Disabled on the server — purely decorative, so appearing after hydration
// is fine and avoids animating for reduced-motion users on first paint.
function getServerEnabled() {
  return false;
}

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribeMotionPreference,
    getEnabled,
    getServerEnabled
  );

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let running = false;
    let tx = -600;
    let ty = -600;
    let cx = -600;
    let cy = -600;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    }

    function tick() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cx - 350}px, ${cy - 350}px)`;
      }
      // Stop the loop once the glow has caught up — resumes on the next
      // mousemove instead of running requestAnimationFrame forever.
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

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
