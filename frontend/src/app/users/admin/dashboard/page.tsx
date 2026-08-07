import { getProduct } from "@/app/service/getProduct";
import Dashboard from "./page.client";
import { getProductAdmin } from "@/app/service/adminProduct";

export default async function Page(){
    const product= await getProductAdmin([], )
    return <Dashboard product={product}/>
}