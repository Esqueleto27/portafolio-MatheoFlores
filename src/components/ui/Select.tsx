"use client";

import type { CSSProperties } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "—",
  error,
  name,
  id,
  ariaLabel,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  name?: string;
  id?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        id={id}
        name={name}
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 36px 12px 14px",
          fontSize: "15px",
          fontFamily: "var(--font-geist-sans)",
          color: value ? "var(--text)" : "var(--muted)",
          background: "var(--fill)",
          border: `1px solid ${error ? "#ef4444" : "var(--hair)"}`,
          borderRadius: "10px",
          outline: "none",
          cursor: "pointer",
          boxSizing: "border-box",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          ...style,
        }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--muted)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
