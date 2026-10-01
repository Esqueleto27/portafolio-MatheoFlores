import { mkdirSync, writeFileSync } from "node:fs";
import { SERVICIOS, PROYECTOS } from "./fixtures";

// Writes .wrangler/seed-demo.sql with the demo services and projects, for
// `npm run db:seed-demo` (local D1 only). Upserts, so it's safe to re-run
// and overwrites whatever demo rows you edited locally — never point this
// at --remote, it would clobber real content edited through the panel.

function q(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "boolean") return value ? "1" : "0";
  if (typeof value === "number") return String(value);
  const str = typeof value === "string" ? value : JSON.stringify(value);
  return `'${str.replace(/'/g, "''")}'`;
}

function upsert(table: string, key: string, row: Record<string, unknown>): string {
  const cols = Object.keys(row);
  const updates = cols.filter((c) => c !== key && c !== "id").map((c) => `"${c}" = excluded."${c}"`);
  return (
    `INSERT INTO ${table} (${cols.map((c) => `"${c}"`).join(", ")}) ` +
    `VALUES (${cols.map((c) => q(row[c])).join(", ")}) ` +
    `ON CONFLICT ("${key}") DO UPDATE SET ${updates.join(", ")};`
  );
}

const statements = [
  ...SERVICIOS.map((s) =>
    upsert("servicios", "id", {
      id: s.id,
      name_es: s.nameEs,
      name_en: s.nameEn,
      description_es: s.descriptionEs,
      description_en: s.descriptionEn,
      order: s.order,
    })
  ),
  ...PROYECTOS.map((p) =>
    upsert("proyectos", "slug", {
      id: crypto.randomUUID(),
      slug: p.slug,
      category: p.category,
      service_id: p.serviceId,
      featured: p.featured,
      business_es: p.businessEs,
      business_en: p.businessEn,
      description_es: p.descriptionEs ?? null,
      description_en: p.descriptionEn ?? null,
      objective_es: p.objectiveEs ?? null,
      objective_en: p.objectiveEn ?? null,
      problem_es: p.problemEs,
      problem_en: p.problemEn,
      solution_es: p.solutionEs,
      solution_en: p.solutionEn,
      challenges_es: p.challengesEs ?? null,
      challenges_en: p.challengesEn ?? null,
      results_es: p.resultsEs ?? null,
      results_en: p.resultsEn ?? null,
      features: p.features ?? [],
      technologies: p.technologies,
      live_url: p.liveUrl ?? null,
    })
  ),
];

mkdirSync(".wrangler", { recursive: true });
writeFileSync(".wrangler/seed-demo.sql", statements.join("\n") + "\n");
console.log(`[seed-demo] ${SERVICIOS.length} servicios + ${PROYECTOS.length} proyectos → .wrangler/seed-demo.sql`);
