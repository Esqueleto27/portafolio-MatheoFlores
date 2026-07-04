import { getProjects, getServices, getMessages } from "@/lib/data";
import { SectionCard } from "@/components/admin/SectionCard";

const SECTIONS = [
  {
    href: "/admin/projects",
    label: "Proyectos",
    description: "Crea, edita y organiza los proyectos del portafolio.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Servicios",
    description: "Administra los servicios que ofreces.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/admin/messages",
    label: "Mensajes",
    description: "Revisa y responde los mensajes de contacto.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <path d="M14 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3l3 3 3-3h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 6h8M4 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default async function AdminDashboard() {
  const [projects, services, messages] = await Promise.all([
    getProjects(),
    getServices(),
    getMessages(),
  ]);

  const pendingMessages = messages.filter((m) => m.status === "pendiente").length;

  const counts: Record<string, string> = {
    "/admin/projects": `${projects.length} ${projects.length === 1 ? "proyecto" : "proyectos"}`,
    "/admin/services": `${services.length} ${services.length === 1 ? "servicio" : "servicios"}`,
    "/admin/messages":
      pendingMessages > 0
        ? `${pendingMessages} pendiente${pendingMessages === 1 ? "" : "s"}`
        : "Sin pendientes",
  };

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
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          maxWidth: "900px",
        }}
      >
        {SECTIONS.map((section) => (
          <SectionCard
            key={section.href}
            href={section.href}
            icon={section.icon}
            label={section.label}
            description={section.description}
            count={counts[section.href]}
          />
        ))}
      </div>
    </div>
  );
}
