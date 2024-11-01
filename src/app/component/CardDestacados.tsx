"use client"

import { Destacados, Productos } from "@/Productos";
import Image from "next/image";
import style  from "@/resources/styles/productCardDestacado.module.css";
import Link from "next/link";
import { productById } from "@/lib/firebase/baseClient";
import { useEffect, useState } from "react";

 export const CardDest = ({destacados}:{destacados:Destacados}) =>{
    const [product, setProduct] = useState <Productos | null>()
    useEffect(()=>{
        const product = async (id:number )=>{
            console.log("useEFe")

            const productos = await productById(id)
            console.log( productos)
            setProduct(productos)
        }
        product(destacados.id)
    },[])


return (<>
    <li className={style.card}>
        <Image  src={`/api/images/${destacados.codigo}`} alt="algun producto destacado" width={290} height={300} unoptimized={true}/>
        <div style={{width:"100%", height:"100%"}} >
        <p>{destacados.descripcion}</p>    
        <Link href={{
            pathname:`/costomers/product/${destacados.descripcion}`,
            query:{hash: btoa(JSON.stringify(product))}

        }} className=""> 
            <p className={style.linkProduct}>Ver mas</p>
        </Link>
        </div>
        
    </li>

</>)
 }

