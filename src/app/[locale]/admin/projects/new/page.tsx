import { getServices } from "@/lib/data";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProject() {
  const services = await getServices();
  return <ProjectForm services={services} />;
}
