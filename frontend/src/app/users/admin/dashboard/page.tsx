import Dashboard from "./page.client";
import { getProductAdmin } from "@/app/service/adminProduct";
import { verificarToken } from "@/app/service/adminUser";
import { redirect } from "next/navigation";

export default async function Page(){
    const identity = await verificarToken();
    if (!identity?.ok) redirect("/users/login");

    const product= await getProductAdmin([], )
    return <Dashboard product={product}/>
}
