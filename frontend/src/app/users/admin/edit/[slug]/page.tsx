import { verificarToken } from "@/app/service/adminUser";
import { getProductBySlug } from "@/app/service/getProduct";
import { redirect } from "next/navigation";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const identity = await verificarToken();
  if (!identity?.ok) redirect("/users/login");

  const { slug } = await params;
  const product = await getProductBySlug(decodeURIComponent(slug));
  if (!product) redirect("/users/admin/dashboard");

  return <EditProductForm product={product} />;
}
