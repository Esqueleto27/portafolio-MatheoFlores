import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { SERVICIOS, PROYECTOS } from "./fixtures";

// Full local-dev seed — run manually with `npm run db:seed`. Fills the
// admin user AND demo services/projects. NOT run automatically on deploy
// (see prisma/bootstrap.ts for that) because upserting these fixtures
// would overwrite real content you've since edited through the admin panel.
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
    console.log(`[seed] admin user ready: ${adminEmail}`);
  } else {
    console.warn("[seed] ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin user");
  }

  for (const servicio of SERVICIOS) {
    await prisma.servicio.upsert({
      where: { id: servicio.id },
      update: servicio,
      create: servicio,
    });
  }
  console.log(`[seed] ${SERVICIOS.length} servicios ready`);

  for (const proyecto of PROYECTOS) {
    await prisma.proyecto.upsert({
      where: { slug: proyecto.slug },
      update: proyecto,
      create: proyecto,
    });
  }
  console.log(`[seed] ${PROYECTOS.length} proyectos ready`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
