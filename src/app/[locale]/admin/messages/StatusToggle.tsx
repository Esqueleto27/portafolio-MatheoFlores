"use client";

import { useState } from "react";
import { updateMessageStatusAction } from "@/lib/admin-actions";

export function StatusToggle({
  id,
  status,
}: {
  id: string;
  status: "pendiente" | "respondido";
}) {
  const [current, setCurrent] = useState(status);

  async function toggle() {
    const next = current === "pendiente" ? "respondido" : "pendiente";
    const result = await updateMessageStatusAction(id, next);
    if (result) setCurrent(result.status);
  }

  return (
    <button
      onClick={toggle}
      style={{
        fontSize: "12px",
        fontWeight: 500,
        padding: "4px 12px",
        borderRadius: "20px",
        border: "1px solid var(--hair)",
        background: current === "respondido" ? "var(--accent)" : "transparent",
        color: current === "respondido" ? "#fff" : "var(--soft)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {current === "pendiente" ? "Pendiente" : "Respondido"}
    </button>
  );
}
