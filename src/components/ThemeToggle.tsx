"use client";

import { useSyncExternalStore } from "react";

// Theme state lives outside React (localStorage + the data-theme attribute
// set by the root layout's init script), so it's read via
// useSyncExternalStore instead of a setState-in-effect after mount.
const THEME_EVENT = "mf-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getIsDark() {
  return localStorage.getItem("theme") !== "light";
}

// Server render assumes dark — the same default as the root layout.
function getServerIsDark() {
  return true;
}

export function ThemeToggle({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark);

  function toggle() {
    const next = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={className}
      style={style}
    >
      {isDark ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
