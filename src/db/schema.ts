import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import type { Feature } from "../lib/types";

// Cloudflare D1 (SQLite). Table and column names match the old Postgres
// schema so the data layer's mapping to the app's snake_case types stays
// the same. SQLite has no enums, arrays or JSON columns: enums are TEXT
// with a TS-level union, arrays/objects are TEXT in Drizzle's json mode.

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

// Stored as epoch milliseconds. The SQL default (not just $defaultFn)
// matters: rows inserted by raw SQL migrations get a timestamp too.
const createdAt = () =>
  integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`);

export const servicios = sqliteTable("servicios", {
  id: text("id").primaryKey(),
  nameEs: text("name_es").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionEs: text("description_es").notNull(),
  descriptionEn: text("description_en").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: createdAt(),
});

export const proyectos = sqliteTable(
  "proyectos",
  {
    id: id(),
    slug: text("slug").notNull().unique(),
    category: text("category", { enum: ["cliente", "demo"] }).notNull(),
    serviceId: text("service_id")
      .notNull()
      .references(() => servicios.id),
    customTagEs: text("custom_tag_es"),
    customTagEn: text("custom_tag_en"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    businessEs: text("business_es").notNull(),
    businessEn: text("business_en").notNull(),
    descriptionEs: text("description_es"),
    descriptionEn: text("description_en"),
    objectiveEs: text("objective_es"),
    objectiveEn: text("objective_en"),
    problemEs: text("problem_es").notNull(),
    problemEn: text("problem_en").notNull(),
    solutionEs: text("solution_es").notNull(),
    solutionEn: text("solution_en").notNull(),
    challengesEs: text("challenges_es"),
    challengesEn: text("challenges_en"),
    resultsEs: text("results_es"),
    resultsEn: text("results_en"),
    features: text("features", { mode: "json" }).$type<Feature[]>().notNull().default([]),
    technologies: text("technologies", { mode: "json" }).$type<string[]>().notNull().default([]),
    liveUrl: text("live_url"),
    githubUrl: text("github_url"),
    showCode: integer("show_code", { mode: "boolean" }).notNull().default(true),
    videoUrl: text("video_url"),
    imageUrl: text("image_url"),
    mobileImageUrl: text("mobile_image_url"),
    beforeImageUrl: text("before_image_url"),
    beforeMobileImageUrl: text("before_mobile_image_url"),
    createdAt: createdAt(),
  },
  (t) => [
    index("proyectos_service_id_idx").on(t.serviceId),
    index("proyectos_category_idx").on(t.category),
    index("proyectos_featured_idx").on(t.featured),
  ]
);

export const mensajesContacto = sqliteTable(
  "mensajes_contacto",
  {
    id: id(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    serviceId: text("service_id")
      .notNull()
      .references(() => servicios.id),
    timeline: text("timeline", { enum: ["urgent", "month", "no_rush", "exploring"] }).notNull(),
    message: text("message").notNull(),
    status: text("status", { enum: ["pendiente", "respondido"] }).notNull().default("pendiente"),
    createdAt: createdAt(),
  },
  (t) => [index("mensajes_contacto_status_idx").on(t.status)]
);

export type Servicio = typeof servicios.$inferSelect;
export type Proyecto = typeof proyectos.$inferSelect;
export type NewProyecto = typeof proyectos.$inferInsert;
export type MensajeContacto = typeof mensajesContacto.$inferSelect;
