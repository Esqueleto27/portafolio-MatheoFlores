"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { SERVICES, type Feature } from "@/lib/mock-data";
import { createProjectAction } from "@/lib/admin-actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FeaturesEditor } from "@/components/admin/FeaturesEditor";
import {
  Section,
  Field,
  SegmentedControl,
  Toggle,
  TagInput,
  inputStyle,
  textAreaStyle,
} from "@/components/admin/form";

export default function NewProject() {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    category: "demo" as "demo" | "cliente",
    service_id: "",
    featured: false,
    business_es: "",
    business_en: "",
    description_es: "",
    description_en: "",
    objective_es: "",
    objective_en: "",
    problem_es: "",
    problem_en: "",
    solution_es: "",
    solution_en: "",
    results_es: "",
    results_en: "",
    live_url: "",
    github_url: "",
    show_code: true,
    video_url: "",
    image_url: "",
    mobile_image_url: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);

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
      description_es: form.description_es || undefined,
      description_en: form.description_en || undefined,
      objective_es: form.objective_es || undefined,
      objective_en: form.objective_en || undefined,
      problem_es: form.problem_es,
      problem_en: form.problem_en,
      solution_es: form.solution_es,
      solution_en: form.solution_en,
      results_es: form.results_es || undefined,
      results_en: form.results_en || undefined,
      features,
      technologies: tags,
      live_url: form.live_url || undefined,
      github_url: form.github_url || undefined,
      show_code: form.show_code,
      video_url: form.video_url || undefined,
      image_url: form.image_url || undefined,
      mobile_image_url: form.mobile_image_url || undefined,
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
        <Section label="Configuración" hint="Estos tres campos definen dónde y cómo aparece el proyecto en el sitio.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <Field label="Categoría *" hint="Demo: proyecto de práctica. Cliente: trabajo real para alguien.">
              <SegmentedControl
                options={[
                  { value: "demo", label: "Demo" },
                  { value: "cliente", label: "Cliente" },
                ]}
                value={form.category}
                onChange={(v) => setForm((p) => ({ ...p, category: v as "demo" | "cliente" }))}
              />
            </Field>

            <Field label="Destacado" hint="Si está activado, este proyecto aparece en la página de inicio.">
              <Toggle
                checked={form.featured}
                onChange={(v) => setForm((p) => ({ ...p, featured: v }))}
                label={form.featured ? "Sí, mostrar en Home" : "No mostrar en Home"}
              />
            </Field>
          </div>

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

        {/* ── Descripción ── */}
        <Section label="Descripción" hint="Línea corta debajo del título, en la ficha del proyecto.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Español" hint="Resumen de una línea, arriba de todo en la ficha">
              <input
                name="description_es"
                value={form.description_es}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Tienda online para un taller artesanal en Quito."
              />
            </Field>
            <Field label="English" hint="One-line summary, shown at the top of the page">
              <input
                name="description_en"
                value={form.description_en}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Online store for an artisan workshop in Quito."
              />
            </Field>
          </div>
        </Section>

        {/* ── Objetivo ── */}
        <Section label="Objetivo" hint="Se muestra junto con el Problema, dentro de la sección “El reto”.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Español" hint="Se muestra junto al Problema, como el reto a resolver">
              <textarea
                name="objective_es"
                value={form.objective_es}
                onChange={handleChange}
                style={textAreaStyle}
                placeholder="Que el taller pudiera vender fuera de Instagram."
              />
            </Field>
            <Field label="English" hint="Shown together with Problem, as the challenge to solve">
              <textarea
                name="objective_en"
                value={form.objective_en}
                onChange={handleChange}
                style={textAreaStyle}
              />
            </Field>
          </div>
        </Section>

        {/* ── Problema ── */}
        <Section label="Problema" hint="También forma parte de “El reto”, debajo del Objetivo.">
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
        <Section label="Solución" hint="Se muestra en la ficha justo debajo de “El reto”.">
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

        {/* ── Resultados ── */}
        <Section label="Resultados" hint="El resultado concreto, se muestra en su propia sección destacada.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Español" hint="El resultado concreto para el cliente">
              <textarea
                name="results_es"
                value={form.results_es}
                onChange={handleChange}
                style={textAreaStyle}
                placeholder="Redujeron los errores de inventario en un 90%."
              />
            </Field>
            <Field label="English">
              <textarea
                name="results_en"
                value={form.results_en}
                onChange={handleChange}
                style={textAreaStyle}
              />
            </Field>
          </div>
        </Section>

        {/* ── Funcionalidades principales ── */}
        <Section
          label="Funcionalidades principales"
          hint="Se muestran en el orden en que las agregas aquí. Solo puedes agregar o eliminar tarjetas."
        >
          <FeaturesEditor features={features} onChange={setFeatures} />
        </Section>

        {/* ── Técnico ── */}
        <Section label="Técnico" hint="Slug, enlaces del proyecto y tecnologías usadas.">
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <Field label="GitHub" hint="Enlace al repositorio (opcional, se muestra discreto)">
              <input
                name="github_url"
                value={form.github_url}
                onChange={handleChange}
                style={inputStyle}
                placeholder="https://github.com/usuario/repo"
              />
            </Field>
            <Field label="Video" hint="Demo en video (opcional)">
              <input
                name="video_url"
                value={form.video_url}
                onChange={handleChange}
                style={inputStyle}
                placeholder="https://youtube.com/..."
              />
            </Field>
          </div>

          <Field
            label="Mostrar código"
            hint="Si lo apagas, en la ficha se muestra “Código no disponible por ahora” en vez del enlace"
          >
            <Toggle
              checked={form.show_code}
              onChange={(v) => setForm((p) => ({ ...p, show_code: v }))}
              label={form.show_code ? "Sí, mostrar enlace" : "No mostrar código"}
            />
          </Field>

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
        <Section
          label="Imagen del proyecto"
          hint="La captura de escritorio se muestra arriba de todo, dentro de un marco tipo navegador."
        >
          <ImageUpload
            currentUrl={form.image_url || undefined}
            onUploaded={(url) => setForm((p) => ({ ...p, image_url: url }))}
          />
        </Section>

        {/* ── Vista en móvil ── */}
        <Section
          label="Vista en móvil"
          hint="Opcional. Sube una captura de cómo se ve el sitio en el celular — se muestra dentro de un marco de teléfono."
        >
          <ImageUpload
            currentUrl={form.mobile_image_url || undefined}
            onUploaded={(url) => setForm((p) => ({ ...p, mobile_image_url: url }))}
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

