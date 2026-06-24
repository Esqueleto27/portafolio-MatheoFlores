import { getProjects, getServices } from "@/lib/data";

export default async function AdminDashboard() {
  const [projects, services] = await Promise.all([
    getProjects(),
    getServices(),
  ]);

  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const clientProjects = projects.filter((p) => p.category === "cliente").length;
  const totalServices = services.length;

  const cards = [
    { label: "Proyectos totales", value: totalProjects },
    { label: "Destacados", value: featuredProjects },
    { label: "Clientes reales", value: clientProjects },
    { label: "Servicios", value: totalServices },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: "clamp(28px, 3vw, 36px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "32px",
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              padding: "24px",
              borderRadius: "14px",
              border: "1px solid var(--hair)",
              background: "var(--card)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                marginBottom: "8px",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: 600,
                color: "var(--accent)",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
