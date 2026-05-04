import { getProduct } from "@/app/service/getProduct";
import Dashboard from "./page.client";

export default async function Page(){
    const product= await getProduct([], )
    return <Dashboard product={product}/>
}