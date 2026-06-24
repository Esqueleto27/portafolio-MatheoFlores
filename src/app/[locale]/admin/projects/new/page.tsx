"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SERVICES, CATEGORIES } from "@/lib/mock-data";
import { createProjectAction } from "@/lib/admin-actions";

export default function NewProject() {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    category: "demo" as string,
    service_id: "",
    featured: false,
    business_es: "",
    business_en: "",
    problem_es: "",
    problem_en: "",
    solution_es: "",
    solution_en: "",
    technologies: "",
    live_url: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createProjectAction({
      slug: form.slug,
      category: form.category as "cliente" | "demo",
      service_id: form.service_id,
      featured: form.featured,
      business_es: form.business_es,
      business_en: form.business_en,
      problem_es: form.problem_es,
      problem_en: form.problem_en,
      solution_es: form.solution_es,
      solution_en: form.solution_en,
      technologies: form.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      live_url: form.live_url || undefined,
    });
    router.push("/admin/projects");
  }

  return (
    <div>
      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "28px",
        }}
      >
        Nuevo proyecto
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "720px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Slug">
            <input name="slug" value={form.slug} onChange={handleChange} style={inputStyle} required />
          </Field>
          <Field label="Categoría">
            <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "cliente" ? "Cliente" : "Demo"}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Servicio">
            <select name="service_id" value={form.service_id} onChange={handleChange} style={inputStyle} required>
              <option value="">—</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name_es}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Destacado">
            <label style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 0" }}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                Mostrar en Home
              </span>
            </label>
          </Field>
        </div>

        <h3 style={sectionTitle}>Español</h3>
        <Field label="Negocio / Cliente">
          <input name="business_es" value={form.business_es} onChange={handleChange} style={inputStyle} required />
        </Field>
        <Field label="Problema">
          <textarea name="problem_es" value={form.problem_es} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} required />
        </Field>
        <Field label="Solución">
          <textarea name="solution_es" value={form.solution_es} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} required />
        </Field>

        <h3 style={sectionTitle}>English</h3>
        <Field label="Business / Client">
          <input name="business_en" value={form.business_en} onChange={handleChange} style={inputStyle} required />
        </Field>
        <Field label="Problem">
          <textarea name="problem_en" value={form.problem_en} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} required />
        </Field>
        <Field label="Solution">
          <textarea name="solution_en" value={form.solution_en} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} required />
        </Field>

        <Field label="Tecnologías (separadas por coma)">
          <input name="technologies" value={form.technologies} onChange={handleChange} style={inputStyle} placeholder="Next.js, Supabase, TypeScript" />
        </Field>

        <Field label="URL del sitio en vivo (opcional)">
          <input name="live_url" value={form.live_url} onChange={handleChange} style={inputStyle} placeholder="https://..." />
        </Field>

        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <Button type="submit" variant="primary">
            Crear proyecto
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/admin/projects")}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--soft)",
          marginBottom: "6px",
          display: "block",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "14px",
  fontFamily: "var(--font-geist-sans)",
  color: "var(--text)",
  background: "var(--fill)",
  border: "1px solid var(--hair)",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--accent-2)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  margin: "8px 0 4px",
  paddingBottom: "4px",
  borderBottom: "1px solid var(--hair)",
};
