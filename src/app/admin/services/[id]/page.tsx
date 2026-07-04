import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/data";
import { DeleteServiceClient } from "./DeleteServiceClient";

export default async function DeleteServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();
  return <DeleteServiceClient service={service} />;
}
