"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { createServiceAction } from "@/lib/admin-actions";

export default function NewService() {
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    name_es: "",
    name_en: "",
    description_es: "",
    description_en: "",
    order: 6,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createServiceAction(form);
    router.push("/admin/services");
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
        Nuevo servicio
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "600px",
        }}
      >
        <Field label="ID (único, ejemplo: mi-servicio)">
          <input name="id" value={form.id} onChange={handleChange} style={inputStyle} required />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Nombre (ES)">
            <input name="name_es" value={form.name_es} onChange={handleChange} style={inputStyle} required />
          </Field>
          <Field label="Name (EN)">
            <input name="name_en" value={form.name_en} onChange={handleChange} style={inputStyle} required />
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Descripción (ES)">
            <textarea name="description_es" value={form.description_es} onChange={handleChange} style={textAreaStyle} required />
          </Field>
          <Field label="Description (EN)">
            <textarea name="description_en" value={form.description_en} onChange={handleChange} style={textAreaStyle} required />
          </Field>
        </div>

        <Field label="Orden">
          <input type="number" name="order" value={form.order} onChange={handleChange} style={{ ...inputStyle, width: "100px" }} />
        </Field>

        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <Button type="submit" variant="primary">Crear servicio</Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/admin/services")}>
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
      <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--soft)", marginBottom: "6px", display: "block" }}>
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

const textAreaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "80px",
  resize: "vertical",
};
