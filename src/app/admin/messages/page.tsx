import { getMessages } from "@/lib/data";
import { StatusToggle } from "./StatusToggle";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const messages = await getMessages();

  return (
    <div>
      <h1
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "24px",
          margin: 0,
        }}
      >
        Mensajes de contacto
      </h1>

      <p
        style={{
          fontSize: "14px",
          color: "var(--muted)",
          marginBottom: "24px",
        }}
      >
        {messages.length} mensaje{messages.length !== 1 ? "s" : ""}
      </p>

      {messages.length === 0 ? (
        <div
          style={{
            padding: "48px 24px",
            textAlign: "center",
            color: "var(--muted)",
            border: "1px solid var(--hair)",
            borderRadius: "14px",
            fontSize: "14px",
          }}
        >
          No hay mensajes aún.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                border: "1px solid var(--hair)",
                borderRadius: "14px",
                padding: "20px",
                background: "var(--bg2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <strong style={{ fontSize: "15px", color: "var(--text)" }}>
                    {m.name}
                  </strong>
                  <span style={{ fontSize: "13px", color: "var(--muted)", marginLeft: "12px" }}>
                    {m.email}
                  </span>
                </div>
                <StatusToggle id={m.id} status={m.status} />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  fontSize: "12px",
                  color: "var(--muted)",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span>Servicio: {m.service_id}</span>
                <span>Plazo: {m.timeline}</span>
                <span>
                  {new Date(m.created_at).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "var(--soft)",
                  lineHeight: 1.6,
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
