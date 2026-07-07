"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteMessageAction } from "@/lib/admin-actions";

export function DeleteMessageButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm("¿Eliminar este mensaje? Esta acción no se puede deshacer.")) {
      return;
    }
    setDeleting(true);
    try {
      await deleteMessageAction(id);
      router.refresh();
    } catch {
      // Without this, a failed delete leaves the button stuck in
      // "Eliminando…" with no feedback and an unhandled rejection.
      window.alert("No se pudo eliminar el mensaje. Intenta de nuevo.");
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      aria-label="Eliminar mensaje"
      title="Eliminar mensaje"
      style={{
        fontSize: "12px",
        fontWeight: 500,
        padding: "4px 10px",
        borderRadius: "20px",
        border: "1px solid var(--hair)",
        background: "transparent",
        color: deleting ? "var(--muted)" : "#ef4444",
        cursor: deleting ? "default" : "pointer",
        opacity: deleting ? 0.6 : 1,
        transition: "all 0.2s",
      }}
    >
      {deleting ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
