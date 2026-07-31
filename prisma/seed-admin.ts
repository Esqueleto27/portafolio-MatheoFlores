import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

// Runs on every boot (see the "start" script) so a fresh deploy always has
// a working admin login without a manual seed step. Only touches the admin
// User row — never demo content — so it's safe to run against a live,
// already-edited database. dotenv is a no-op here in production, where
// Coolify injects env vars directly rather than via a .env.local file.
config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.warn("[seed-admin] ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin user");
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: { passwordHash },
    create: { email: adminEmail.toLowerCase(), passwordHash, name: "Admin" },
  });
  console.log(`[seed-admin] admin user ready: ${adminEmail}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
