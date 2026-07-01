"use client";

import { useState, useTransition } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { reorderServiceAction } from "@/lib/admin-actions";
import type { Service } from "@/lib/mock-data";

export function ServicesTable({ initial }: { initial: Service[] }) {
  const [services, setServices] = useState(initial);
  const [isPending, startTransition] = useTransition();

  async function move(index: number, dir: -1 | 1) {
    const next = [...services];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;

    // swap
    [next[index], next[target]] = [next[target], next[index]];

    // reassign orders sequentially
    const updated = next.map((s, i) => ({ ...s, order: i + 1 }));
    setServices(updated);

    startTransition(async () => {
      await Promise.all([
        reorderServiceAction(updated[index].id, updated[index].order),
        reorderServiceAction(updated[target].id, updated[target].order),
      ]);
    });
  }

  return (
    <div style={{ border: "1px solid var(--hair)", borderRadius: "14px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{
            background: "var(--bg2)",
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            textAlign: "left",
          }}>
            <th style={{ padding: "12px 16px" }}>Orden</th>
            <th style={{ padding: "12px 16px" }}>Nombre (ES)</th>
            <th style={{ padding: "12px 16px" }}>Nombre (EN)</th>
            <th style={{ padding: "12px 16px" }}>Imagen</th>
            <th style={{ padding: "12px 16px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={s.id} style={{ borderTop: "1px solid var(--hair)", fontSize: "14px", color: "var(--soft)" }}>
              <td style={{ padding: "10px 16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "center", width: "40px" }}>
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0 || isPending}
                    style={{
                      background: "none", border: "1px solid var(--hair)", borderRadius: "4px",
                      cursor: i === 0 ? "default" : "pointer", padding: "1px 6px",
                      color: i === 0 ? "var(--hair)" : "var(--muted)", fontSize: "11px", lineHeight: 1,
                    }}
                  >▲</button>
                  <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>
                    {s.order}
                  </span>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === services.length - 1 || isPending}
                    style={{
                      background: "none", border: "1px solid var(--hair)", borderRadius: "4px",
                      cursor: i === services.length - 1 ? "default" : "pointer", padding: "1px 6px",
                      color: i === services.length - 1 ? "var(--hair)" : "var(--muted)", fontSize: "11px", lineHeight: 1,
                    }}
                  >▼</button>
                </div>
              </td>
              <td style={{ padding: "10px 16px", fontWeight: 500 }}>{s.name_es}</td>
              <td style={{ padding: "10px 16px" }}>{s.name_en}</td>
              <td style={{ padding: "10px 16px" }}>
                {s.image_url
                  ? <img src={s.image_url} alt="" style={{ width: "48px", height: "32px", objectFit: "cover", borderRadius: "4px", border: "1px solid var(--hair)" }} />
                  : <span style={{ fontSize: "12px", color: "var(--hair)" }}>—</span>
                }
              </td>
              <td style={{ padding: "10px 16px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <Link href={`/admin/services/${s.id}/edit`} style={{ fontSize: "13px", color: "var(--accent-2)", textDecoration: "none" }}>
                    Editar
                  </Link>
                  <Link href={`/admin/services/${s.id}`} style={{ fontSize: "13px", color: "#ef4444", textDecoration: "none" }}>
                    Eliminar
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
