"use client";

import type { Feature } from "@/lib/mock-data";
import { Field, inputStyle, textAreaStyle } from "@/components/admin/form";

interface FeaturesEditorProps {
  features: Feature[];
  onChange: (features: Feature[]) => void;
}

const EMPTY_FEATURE: Feature = { title_es: "", title_en: "", benefit_es: "", benefit_en: "" };

export function FeaturesEditor({ features, onChange }: FeaturesEditorProps) {
  function update(index: number, updates: Partial<Feature>) {
    onChange(features.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= features.length) return;
    const next = [...features];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    onChange(features.filter((_, i) => i !== index));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {features.map((feature, i) => (
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Título (ES)" hint="Nombre técnico corto, ej. 'Historial clínico'">
              <input
                value={feature.title_es}
                onChange={(e) => update(i, { title_es: e.target.value })}
                style={inputStyle}
              />
            </Field>
            <Field label="Title (EN)">
              <input
                value={feature.title_en}
                onChange={(e) => update(i, { title_en: e.target.value })}
                style={inputStyle}
              />
            </Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Beneficio (ES)" hint="En lenguaje simple, para alguien no técnico">
              <textarea
                value={feature.benefit_es}
                onChange={(e) => update(i, { benefit_es: e.target.value })}
                style={textAreaStyle}
                placeholder="el doctor ve todo el historial del paciente en un clic, sin buscar papeles"
              />
            </Field>
            <Field label="Benefit (EN)">
              <textarea
                value={feature.benefit_en}
                onChange={(e) => update(i, { benefit_en: e.target.value })}
                style={textAreaStyle}
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
              disabled={i === features.length - 1}
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
        onClick={() => onChange([...features, { ...EMPTY_FEATURE }])}
        style={addButtonStyle}
      >
        + Agregar funcionalidad
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
