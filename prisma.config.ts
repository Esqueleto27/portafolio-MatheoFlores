import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Prisma's CLI only auto-loads a plain ".env", not Next.js's ".env.local" —
// load it explicitly so `prisma db push`/`db seed` see the same DATABASE_URL
// the Next.js app uses.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
