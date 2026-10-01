import { defineConfig } from "drizzle-kit";

// Only used to generate SQL migrations from src/db/schema.ts. They are
// applied with Wrangler (`npm run db:migrate:local` / `:remote`), which
// reads the same ./migrations folder via `migrations_dir` in wrangler.jsonc.
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
});
