import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/data";
import { EditServiceForm } from "./EditServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();
  return <EditServiceForm service={service} />;
}
