"use client";

import { useState, useTransition } from "react";
import { updateProjectAction } from "@/lib/admin-actions";

export function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [current, setCurrent] = useState(featured);

  function toggle() {
    const next = !current;
    setCurrent(next);
    startTransition(async () => {
      await updateProjectAction(id, { featured: next });
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      title={current ? "Quitar de destacados" : "Marcar como destacado"}
      style={{
        background: "none",
        border: "none",
        cursor: isPending ? "wait" : "pointer",
        fontSize: "20px",
        lineHeight: 1,
        padding: "2px 4px",
        borderRadius: "6px",
        color: current ? "#f59e0b" : "var(--hair)",
        transition: "color 0.15s, opacity 0.15s",
        opacity: isPending ? 0.5 : 1,
      }}
    >
      {current ? "★" : "☆"}
    </button>
  );
}
