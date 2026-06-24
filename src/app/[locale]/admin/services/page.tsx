import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/data";

export default async function AdminServices() {
  const services = await getServices();

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
          Servicios
        </h1>
        <Link href="/admin/services/new" style={{ textDecoration: "none" }}>
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
              <th style={{ padding: "12px 16px" }}>Nombre (ES)</th>
              <th style={{ padding: "12px 16px" }}>Nombre (EN)</th>
              <th style={{ padding: "12px 16px" }}>Orden</th>
              <th style={{ padding: "12px 16px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr
                key={s.id}
                style={{
                  borderTop: "1px solid var(--hair)",
                  fontSize: "14px",
                  color: "var(--soft)",
                }}
              >
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                  {s.name_es}
                </td>
                <td style={{ padding: "12px 16px" }}>{s.name_en}</td>
                <td style={{ padding: "12px 16px" }}>{s.order}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Link
                      href={`/admin/services/${s.id}/edit`}
                      style={{
                        fontSize: "13px",
                        color: "var(--accent-2)",
                        textDecoration: "none",
                      }}
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/admin/services/${s.id}`}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
