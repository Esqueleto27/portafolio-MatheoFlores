"use client";

import { useEffect } from "react";

/**
 * Global IntersectionObserver that watches all [data-reveal] elements.
 * Adds class "visible" when they enter the viewport (threshold 0.06).
 * Uses only transform — opacity stays at 1 always (design-spec §6).
 * Include once in the locale layout.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
