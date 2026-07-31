import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { SERVICIOS } from "./fixtures";

// Runs on every boot (see the "start"/"db:deploy" scripts) so a fresh
// deploy always has a working admin login and a non-empty Servicio table
// (the "¿Qué servicio ofreciste?" dropdown, used both by the public
// contact form and the admin project form) with no manual step.
//
// Both parts are guarded to never touch data that already exists:
// - the admin user is upserted (safe — always meant to match env vars)
// - Servicios are only inserted when the table is completely empty, so
//   this never overwrites services you've since edited or deleted
//   through the admin panel. Demo Proyectos are intentionally NOT
//   seeded here — see prisma/seed.ts for the full local-dev fixture set.
//
// dotenv is a no-op in production, where Coolify injects env vars
// directly rather than via a .env.local file.
config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail.toLowerCase() },
      update: { passwordHash },
      create: { email: adminEmail.toLowerCase(), passwordHash, name: "Admin" },
    });
    console.log(`[bootstrap] admin user ready: ${adminEmail}`);
  } else {
    console.warn("[bootstrap] ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin user");
  }

  const servicioCount = await prisma.servicio.count();
  if (servicioCount === 0) {
    await prisma.servicio.createMany({ data: SERVICIOS });
    console.log(`[bootstrap] table was empty — seeded ${SERVICIOS.length} default servicios`);
  } else {
    console.log(`[bootstrap] servicios table already has ${servicioCount} row(s) — left untouched`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
