import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/data";
import { ServicesTable } from "./ServicesTable";

export default async function AdminServices() {
  const services = await getServices();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--text)", margin: 0 }}>
          Servicios
        </h1>
        <Link href="/admin/services/new" style={{ textDecoration: "none" }}>
          <Button variant="primary" size="compact">+ Nuevo</Button>
        </Link>
      </div>
      <ServicesTable initial={services} />
    </div>
  );
}
