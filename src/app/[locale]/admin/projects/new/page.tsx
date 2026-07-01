"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/mock-data";
import { createProjectAction } from "@/lib/admin-actions";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function NewProject() {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    category: "demo" as "demo" | "cliente",
    service_id: "",
    featured: false,
    business_es: "",
    business_en: "",
    problem_es: "",
    problem_en: "",
    solution_es: "",
    solution_en: "",
    live_url: "",
    image_url: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  function toSlug(str: string) {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "business_es" && !slugEdited) {
        updated.slug = toSlug(value);
      }
      return updated;
    });
  }

  function addTag(raw: string) {
    const tag = raw.trim().replace(/,$/, "");
    if (tag && !tags.includes(tag)) setTags((p) => [...p, tag]);
    setTagInput("");
  }

  function handleTagKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags((p) => p.slice(0, -1));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createProjectAction({
      slug: form.slug,
      category: form.category,
      service_id: form.service_id,
      featured: form.featured,
      business_es: form.business_es,
      business_en: form.business_en,
      problem_es: form.problem_es,
      problem_en: form.problem_en,
      solution_es: form.solution_es,
      solution_en: form.solution_en,
      technologies: tags,
      live_url: form.live_url || undefined,
      image_url: form.image_url || undefined,
    });
    router.push("/admin/projects");
  }

  return (
    <div style={{ maxWidth: "960px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "clamp(22px, 2.5vw, 28px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            margin: 0,
          }}
        >
          Nuevo proyecto
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "6px" }}>
          Los campos marcados con * son obligatorios
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── Configuración ── */}
        <Section label="Configuración">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "20px",
              alignItems: "end",
            }}
          >
            <Field label="Categoría *">
              <SegmentedControl
                options={[
                  { value: "demo", label: "Demo" },
                  { value: "cliente", label: "Cliente" },
                ]}
                value={form.category}
                onChange={(v) => setForm((p) => ({ ...p, category: v as "demo" | "cliente" }))}
              />
            </Field>

            <Field label="Servicio *" hint="¿Qué servicio ofreciste en este proyecto?">
              <select
                name="service_id"
                value={form.service_id}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Seleccionar servicio…</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name_es}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Destacado" hint="Aparece en la home">
              <Toggle
                checked={form.featured}
                onChange={(v) => setForm((p) => ({ ...p, featured: v }))}
                label="Mostrar en Home"
              />
            </Field>
          </div>
        </Section>

        {/* ── Nombre ── */}
        <Section label="Nombre del negocio">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Español *" hint='Nombre como aparecerá en el sitio en español'>
              <input
                name="business_es"
                value={form.business_es}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Restaurante La Ronda"
                required
              />
            </Field>
            <Field label="English *" hint="Name as it appears on the English site">
              <input
                name="business_en"
                value={form.business_en}
                onChange={handleChange}
                style={inputStyle}
                placeholder="La Ronda Restaurant"
                required
              />
            </Field>
          </div>
        </Section>

        {/* ── Problema ── */}
        <Section label="Problema">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Español *" hint="¿Qué problema tenía el cliente?">
              <textarea
                name="problem_es"
                value={form.problem_es}
                onChange={handleChange}
                style={textAreaStyle}
                placeholder="El negocio no tenía presencia en línea y perdía clientes frente a la competencia."
                required
              />
            </Field>
            <Field label="English *" hint="What problem did the client have?">
              <textarea
                name="problem_en"
                value={form.problem_en}
                onChange={handleChange}
                style={textAreaStyle}
                placeholder="The business had no online presence and was losing customers to competitors."
                required
              />
            </Field>
          </div>
        </Section>

        {/* ── Solución ── */}
        <Section label="Solución">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Español *" hint="¿Qué construiste para resolverlo?">
              <textarea
                name="solution_es"
                value={form.solution_es}
                onChange={handleChange}
                style={textAreaStyle}
                placeholder="Diseñé y desarrollé un sitio web completo con menú online, reservas y SEO local."
                required
              />
            </Field>
            <Field label="English *" hint="What did you build to solve it?">
              <textarea
                name="solution_en"
                value={form.solution_en}
                onChange={handleChange}
                style={textAreaStyle}
                placeholder="I designed and built a complete website with online menu, reservations, and local SEO."
                required
              />
            </Field>
          </div>
        </Section>

        {/* ── Técnico ── */}
        <Section label="Técnico">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <Field label="Slug *" hint="URL del proyecto — se genera solo desde el nombre">
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "13px",
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                    pointerEvents: "none",
                  }}
                >
                  /proyectos/
                </span>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    setForm((p) => ({ ...p, slug: e.target.value }));
                  }}
                  style={{ ...inputStyle, paddingLeft: "86px", fontFamily: "var(--font-geist-mono)", fontSize: "13px" }}
                  placeholder="restaurante-la-ronda"
                  required
                />
              </div>
            </Field>

            <Field label="URL en vivo" hint="Si el sitio ya está publicado (opcional)">
              <input
                name="live_url"
                value={form.live_url}
                onChange={handleChange}
                style={inputStyle}
                placeholder="https://restaurante.com"
              />
            </Field>
          </div>

          <Field label="Tecnologías" hint="Escribe una tecnología y presiona Enter o coma para agregar">
            <TagInput
              tags={tags}
              input={tagInput}
              onInput={setTagInput}
              onKeyDown={handleTagKey}
              onRemove={(t) => setTags((p) => p.filter((x) => x !== t))}
              onBlur={() => tagInput.trim() && addTag(tagInput)}
            />
          </Field>
        </Section>

        {/* ── Imagen ── */}
        <Section label="Imagen del proyecto">
          <ImageUpload
            currentUrl={form.image_url || undefined}
            onUploaded={(url) => setForm((p) => ({ ...p, image_url: url }))}
          />
        </Section>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", paddingTop: "28px" }}>
          <Button type="submit" variant="primary">
            Crear proyecto
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/projects")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ─── Sub-components ─── */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "28px 0",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-geist-mono)",
          marginBottom: "18px",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--soft)",
          display: "block",
          marginBottom: hint ? "3px" : "7px",
        }}
      >
        {label}
      </label>
      {hint && (
        <p
          style={{
            fontSize: "11px",
            color: "var(--muted)",
            marginBottom: "7px",
            lineHeight: 1.4,
          }}
        >
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid var(--hair)",
        borderRadius: "8px",
        overflow: "hidden",
        background: "var(--fill)",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            padding: "9px 18px",
            fontSize: "13px",
            fontWeight: value === opt.value ? 600 : 400,
            background: value === opt.value ? "var(--accent)" : "transparent",
            color: value === opt.value ? "#fff" : "var(--muted)",
            border: "none",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        paddingTop: "4px",
      }}
    >
      <div
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: "38px",
          height: "22px",
          borderRadius: "11px",
          background: checked ? "var(--accent)" : "var(--fill2)",
          border: "1px solid var(--hair)",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "17px" : "2px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
      <span style={{ fontSize: "13px", color: "var(--soft)" }}>{label}</span>
    </label>
  );
}

function TagInput({
  tags,
  input,
  onInput,
  onKeyDown,
  onRemove,
  onBlur,
}: {
  tags: string[];
  input: string;
  onInput: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemove: (tag: string) => void;
  onBlur: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        padding: "8px 10px",
        background: "var(--fill)",
        border: "1px solid var(--hair)",
        borderRadius: "8px",
        minHeight: "44px",
        alignItems: "center",
        cursor: "text",
      }}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "3px 8px 3px 9px",
            borderRadius: "5px",
            background: "var(--fill2)",
            border: "1px solid var(--hair)",
            fontSize: "12px",
            color: "var(--soft)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          {tag}
          <button
            type="button"
            onClick={() => onRemove(tag)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted)",
              padding: "0",
              lineHeight: 1,
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder={tags.length === 0 ? "Next.js, Supabase, TypeScript… (Enter para agregar)" : "Agregar más…"}
        style={{
          flex: 1,
          minWidth: "160px",
          background: "none",
          border: "none",
          outline: "none",
          fontSize: "13px",
          color: "var(--text)",
          fontFamily: "var(--font-geist-sans)",
          padding: "2px 0",
        }}
      />
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

const textAreaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "90px",
  resize: "vertical",
  lineHeight: 1.5,
};
