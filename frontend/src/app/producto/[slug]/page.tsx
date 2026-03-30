import Producto from "./page.client";

export default async function  Page({params}:{params:{slug:string}}){
    const {slug} = await params
    console.log(slug)
    
    
    return <Producto/>
}