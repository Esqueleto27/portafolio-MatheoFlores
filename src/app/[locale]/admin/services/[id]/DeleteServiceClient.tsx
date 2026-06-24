"use client";

import { useRouter, Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { deleteServiceAction } from "@/lib/admin-actions";
import type { Service } from "@/lib/mock-data";

export function DeleteServiceClient({ service }: { service: Service }) {
  const router = useRouter();

  async function handleDelete() {
    await deleteServiceAction(service.id);
    router.push("/admin/services");
  }

  return (
    <div style={{ maxWidth: "480px" }}>
      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "16px",
        }}
      >
        Eliminar servicio
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: "var(--muted)",
          lineHeight: 1.6,
          marginBottom: "24px",
        }}
      >
        ¿Estás seguro de que querés eliminar{" "}
        <strong style={{ color: "var(--soft)" }}>{service.name_es}</strong>?
        Esta acción no se puede deshacer.
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          variant="primary"
          onClick={handleDelete}
          style={{ background: "#ef4444" }}
        >
          Sí, eliminar
        </Button>
        <Link href="/admin/services" style={{ textDecoration: "none" }}>
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
        </Link>
      </div>
    </div>
  );
}
