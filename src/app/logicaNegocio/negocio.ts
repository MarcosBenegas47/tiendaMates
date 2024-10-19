import { productById } from "@/lib/firebase/baseClient"
import { Productos } from "@/Productos"

export const productNegocio = async ( id:number)=>{
    const porducto = await productById(id)
    return porducto as Productos
}