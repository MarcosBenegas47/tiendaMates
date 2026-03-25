"use client"

import { ProductosInter } from "@/Productos"
import { useEffect, useState } from "react"
import { getProduct } from "../service/getProduct"

export default function Productos() {
   const [productos, setProductos] = useState<ProductosInter[] | null>([])
       useEffect(()=>{
         async function getProducts(){
            const productos =await getProduct()
            setProductos(productos)
         }
         getProducts()
       },[])

   return (<>
      {productos?.map(prod=> (
         <p key={prod.id}>{prod.nombre}</p>
      ))}
   </>)

}   