import { getProductBySlug } from "@/app/service/getProduct";
import Producto from "./page.client";

export default async function  Page({params}:{params:{slug:string}}){
    const {slug} = await params
    
    const porducto = await getProductBySlug(slug)
    
    return <Producto product={porducto}/>
}