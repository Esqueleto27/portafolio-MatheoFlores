"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import type { Project, Service, Feature } from "@/lib/types";
import { createProjectAction, updateProjectAction } from "@/lib/admin-actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FeaturesEditor } from "@/components/admin/FeaturesEditor";
import {
  Section,
  Field,
  SegmentedControl,
  SubHeading,
  Toggle,
  TagInput,
  inputStyle,
  textAreaStyle,
} from "@/components/admin/form";

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

export function ProjectForm({
  project,
  services,
}: {
  project?: Project;
  services: Service[];
}) {
  const router = useRouter();
  const isEdit = !!project;

  const [form, setForm] = useState({
    slug: project?.slug ?? "",
    category: (project?.category ?? "demo") as "demo" | "cliente",
    service_id: project?.service_id ?? "",
    custom_tag_es: project?.custom_tag_es ?? "",
    custom_tag_en: project?.custom_tag_en ?? "",
    featured: project?.featured ?? false,
    business_es: project?.business_es ?? "",
    business_en: project?.business_en ?? "",
    description_es: project?.description_es ?? "",
    description_en: project?.description_en ?? "",
    objective_es: project?.objective_es ?? "",
    objective_en: project?.objective_en ?? "",
    problem_es: project?.problem_es ?? "",
    problem_en: project?.problem_en ?? "",
    solution_es: project?.solution_es ?? "",
    solution_en: project?.solution_en ?? "",
    results_es: project?.results_es ?? "",
    results_en: project?.results_en ?? "",
    live_url: project?.live_url ?? "",
    github_url: project?.github_url ?? "",
    show_code: project?.show_code ?? true,
    video_url: project?.video_url ?? "",
    image_url: project?.image_url ?? "",
    mobile_image_url: project?.mobile_image_url ?? "",
    before_image_url: project?.before_image_url ?? "",
    before_mobile_image_url: project?.before_mobile_image_url ?? "",
  });
  const [tags, setTags] = useState<string[]>(project?.technologies ?? []);
  const [tagInput, setTagInput] = useState("");
  // Editing an existing project keeps its slug fixed; only a brand-new
  // project auto-derives the slug from the Spanish business name.
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [features, setFeatures] = useState<Feature[]>(project?.features ?? []);

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
    if (!form.service_id) {
      alert("Selecciona un servicio.");
      return;
    }

    const payload = {
      slug: form.slug,
      category: form.category,
      service_id: form.service_id,
      custom_tag_es: form.custom_tag_es || undefined,
      custom_tag_en: form.custom_tag_en || undefined,
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
      image_url: form.image_url || null,
      mobile_image_url: form.mobile_image_url || null,
      before_image_url: form.before_image_url || null,
      before_mobile_image_url: form.before_mobile_image_url || null,
    };

    if (isEdit) {
      await updateProjectAction(project.id, payload);
    } else {
      await createProjectAction(payload);
    }
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
          {isEdit ? `Editar: ${project.business_es}` : "Nuevo proyecto"}
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "6px" }}>
          Los campos marcados con * son obligatorios
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── Configuración ── */}
        <Section label="Configuración" hint="Dónde y cómo aparece el proyecto en el sitio, más sus datos técnicos.">
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
            <Select
              name="service_id"
              value={form.service_id}
              onChange={(v) => setForm((p) => ({ ...p, service_id: v }))}
              placeholder="Seleccionar servicio…"
              options={services.map((s) => ({ value: s.id, label: s.name_es }))}
            />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <Field
              label="Etiqueta personalizada (opcional)"
              hint='Si la llenas, reemplaza la etiqueta de arriba en la tarjeta y la ficha (ej. "Bootcamp"). No afecta el selector de servicios del formulario de contacto.'
            >
              <input
                name="custom_tag_es"
                value={form.custom_tag_es}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Bootcamp"
              />
            </Field>
            <Field label="Custom tag (English, optional)" hint="Same text but in English, if it needs to differ.">
              <input
                name="custom_tag_en"
                value={form.custom_tag_en}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Bootcamp"
              />
            </Field>
          </div>

          <SubHeading>Detalles técnicos</SubHeading>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
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

        {/* ── Nombre ── */}
        <Section label="Nombre del negocio">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Español *" hint="Nombre como aparecerá en el sitio en español">
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
            <Field label="English" hint="The concrete result for the client">
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

        {/* ── Imagen de escritorio ── */}
        <Section
          label="Captura de escritorio"
          hint='La captura "Después" se muestra arriba de todo, dentro de un marco tipo navegador. Si además subes una captura "Antes", la ficha del proyecto muestra un slider interactivo para compararlas (útil para proyectos de "arregla mi web").'
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Antes (opcional)" hint="Captura del sitio anterior, si este proyecto es un rediseño.">
              <ImageUpload
                currentUrl={form.before_image_url || undefined}
                onUploaded={(url) => setForm((p) => ({ ...p, before_image_url: url }))}
                onRemove={() => setForm((p) => ({ ...p, before_image_url: "" }))}
              />
            </Field>
            <Field label="Después">
              <ImageUpload
                currentUrl={form.image_url || undefined}
                onUploaded={(url) => setForm((p) => ({ ...p, image_url: url }))}
                onRemove={() => setForm((p) => ({ ...p, image_url: "" }))}
              />
            </Field>
          </div>
        </Section>

        {/* ── Vista en móvil ── */}
        <Section
          label="Captura móvil"
          hint='Opcional. Se muestra dentro de un marco de teléfono. Si subes "Antes" y "Después", la ficha muestra el slider interactivo también en la vista móvil.'
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Field label="Antes (opcional)">
              <ImageUpload
                currentUrl={form.before_mobile_image_url || undefined}
                onUploaded={(url) => setForm((p) => ({ ...p, before_mobile_image_url: url }))}
                onRemove={() => setForm((p) => ({ ...p, before_mobile_image_url: "" }))}
              />
            </Field>
            <Field label="Después (opcional)">
              <ImageUpload
                currentUrl={form.mobile_image_url || undefined}
                onUploaded={(url) => setForm((p) => ({ ...p, mobile_image_url: url }))}
                onRemove={() => setForm((p) => ({ ...p, mobile_image_url: "" }))}
              />
            </Field>
          </div>
        </Section>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", paddingTop: "28px" }}>
          <Button type="submit" variant="primary">
            {isEdit ? "Guardar cambios" : "Crear proyecto"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/admin/projects")}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
