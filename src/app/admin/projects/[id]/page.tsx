import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";
import { DeleteProjectClient } from "./DeleteProjectClient";

export default async function DeleteProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();
  return <DeleteProjectClient project={project} />;
}
