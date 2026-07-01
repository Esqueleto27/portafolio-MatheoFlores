import { type Project, type Locale, getServiceName } from "@/lib/mock-data";
import { TechChip, ServicePill } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  viewCaseLabel: string;
}

export function ProjectCard({ project, locale, viewCaseLabel }: ProjectCardProps) {
  const title = locale === "en" ? project.business_en : project.business_es;
  const tagline = locale === "en" ? project.solution_en : project.solution_es;
  const serviceName = getServiceName(project.service_id, locale);
  const categoryLabel =
    project.category === "demo"
      ? "Demo"
      : locale === "en"
      ? "Client"
      : "Cliente";

  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      {/* Browser mockup header */}
      <div
        style={{
          padding: "12px 16px 0",
          background: "var(--card)",
          borderBottom: "1px solid var(--hair)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--browser-red)" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--browser-yellow)" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--browser-green)" }} />
          <div
            style={{
              flex: 1,
              marginLeft: "10px",
              height: "22px",
              borderRadius: "4px",
              background: "var(--fill)",
              border: "1px solid var(--hair)",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--muted)",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {project.live_url ?? `matheoflores.dev/${project.slug}`}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div
        style={{
          aspectRatio: "16/10",
          background: "var(--mockup)",
          backgroundImage: project.image_url
            ? "none"
            : "repeating-linear-gradient(135deg, var(--stripe) 0 2px, transparent 2px 13px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {project.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image_url}
            alt={locale === "en" ? project.business_en : project.business_es}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              position: "absolute",
              inset: 0,
            }}
          />
        )}
        <div className="card-glow" />
      </div>

      {/* Body */}
      <div
        style={{
          padding: "22px 24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "9px", alignItems: "center", flexWrap: "wrap" }}>
          <ServicePill>{serviceName}</ServicePill>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {categoryLabel}
          </span>
        </div>

        <h3
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: "16px",
            color: "var(--muted)",
            lineHeight: 1.55,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tagline}
        </p>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "2px" }}>
          {project.technologies.map((tech) => (
            <TechChip key={tech}>{tech}</TechChip>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginTop: "4px",
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--accent-2)",
          }}
        >
          {viewCaseLabel}
          <span className="card-arrow" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}
