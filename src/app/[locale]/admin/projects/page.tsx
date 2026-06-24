import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { TechChip } from "@/components/ui/Badge";
import { getProjects, getServices } from "@/lib/data";
import { FeaturedToggle } from "./FeaturedToggle";

export default async function AdminProjects() {
  const [projects, services] = await Promise.all([
    getProjects(),
    getServices(),
  ]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            margin: 0,
          }}
        >
          Proyectos
        </h1>
        <Link href="/admin/projects/new" style={{ textDecoration: "none" }}>
          <Button variant="primary" size="compact">
            + Nuevo
          </Button>
        </Link>
      </div>

      <div
        style={{
          border: "1px solid var(--hair)",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "var(--bg2)",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "12px 16px" }}>Negocio</th>
              <th style={{ padding: "12px 16px" }}>Categoría</th>
              <th style={{ padding: "12px 16px" }}>Servicio</th>
              <th style={{ padding: "12px 16px" }}>Destacado</th>
              <th style={{ padding: "12px 16px" }}>Tecnologías</th>
              <th style={{ padding: "12px 16px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              const svc = services.find((s) => s.id === p.service_id);
              return (
                <tr
                  key={p.id}
                  style={{
                    borderTop: "1px solid var(--hair)",
                    fontSize: "14px",
                    color: "var(--soft)",
                  }}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                    {p.business_es}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {p.category === "cliente" ? "Cliente" : "Demo"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {svc?.name_es ?? p.service_id}
                  </td>
                  <td style={{ padding: "8px 16px" }}>
                    <FeaturedToggle id={p.id} featured={p.featured} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {p.technologies.slice(0, 2).map((t) => (
                        <TechChip key={t}>{t}</TechChip>
                      ))}
                      {p.technologies.length > 2 && (
                        <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                          +{p.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        style={{
                          fontSize: "13px",
                          color: "var(--accent-2)",
                          textDecoration: "none",
                        }}
                      >
                        Editar
                      </Link>
                      <Link
                        href={`/admin/projects/${p.id}`}
                        style={{
                          fontSize: "13px",
                          color: "#ef4444",
                          textDecoration: "none",
                        }}
                      >
                        Eliminar
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
