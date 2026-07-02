"use client";

import type { Screenshot } from "@/lib/mock-data";
import { Field, SegmentedControl, inputStyle } from "@/components/admin/form";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface ScreenshotsEditorProps {
  screenshots: Screenshot[];
  onChange: (screenshots: Screenshot[]) => void;
}

const EMPTY_SCREENSHOT: Screenshot = { url: "", kind: "after", device: "desktop" };

export function ScreenshotsEditor({ screenshots, onChange }: ScreenshotsEditorProps) {
  function update(index: number, updates: Partial<Screenshot>) {
    onChange(screenshots.map((s, i) => (i === index ? { ...s, ...updates } : s)));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= screenshots.length) return;
    const next = [...screenshots];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    onChange(screenshots.filter((_, i) => i !== index));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {screenshots.map((shot, i) => (
        <div
          key={i}
          style={{
            border: "1px solid var(--hair)",
            borderRadius: "10px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "var(--fill)",
          }}
        >
          <ImageUpload
            currentUrl={shot.url || undefined}
            onUploaded={(url) => update(i, { url })}
          />

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Field label="Tipo">
              <SegmentedControl
                options={[
                  { value: "before", label: "Antes" },
                  { value: "after", label: "Después" },
                ]}
                value={shot.kind}
                onChange={(v) => update(i, { kind: v as Screenshot["kind"] })}
              />
            </Field>

            {shot.kind === "after" && (
              <Field label="Dispositivo" hint="Para emparejar desktop/mobile en la galería">
                <SegmentedControl
                  options={[
                    { value: "desktop", label: "Desktop" },
                    { value: "mobile", label: "Mobile" },
                  ]}
                  value={shot.device ?? "desktop"}
                  onChange={(v) => update(i, { device: v as Screenshot["device"] })}
                />
              </Field>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Etiqueta (ES)" hint="Opcional">
              <input
                value={shot.label_es ?? ""}
                onChange={(e) => update(i, { label_es: e.target.value })}
                style={inputStyle}
              />
            </Field>
            <Field label="Label (EN)" hint="Optional">
              <input
                value={shot.label_en ?? ""}
                onChange={(e) => update(i, { label_en: e.target.value })}
                style={inputStyle}
              />
            </Field>
          </div>

          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} style={rowButtonStyle}>
              ↑ Subir
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === screenshots.length - 1}
              style={rowButtonStyle}
            >
              ↓ Bajar
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              style={{ ...rowButtonStyle, color: "#ef4444", borderColor: "#ef444444" }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...screenshots, { ...EMPTY_SCREENSHOT }])}
        style={addButtonStyle}
      >
        + Agregar captura
      </button>
    </div>
  );
}

const rowButtonStyle: React.CSSProperties = {
  padding: "6px 10px",
  fontSize: "12px",
  color: "var(--muted)",
  background: "transparent",
  border: "1px solid var(--hair)",
  borderRadius: "6px",
  cursor: "pointer",
};

const addButtonStyle: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--accent)",
  background: "transparent",
  border: "1px dashed var(--hair)",
  borderRadius: "8px",
  cursor: "pointer",
  alignSelf: "flex-start",
};
