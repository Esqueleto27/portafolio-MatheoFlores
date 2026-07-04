import { notFound } from "next/navigation";
import { getProjectById, getServices } from "@/lib/data";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, services] = await Promise.all([
    getProjectById(id),
    getServices(),
  ]);
  if (!project) notFound();
  return <ProjectForm project={project} services={services} />;
}
