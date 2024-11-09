"use client"

import { Destacados, Productos } from "@/Productos";
import Image from "next/image";
import style  from "@/resources/styles/productCardDestacado.module.css";
import Link from "next/link";
import { productById } from "@/lib/firebase/baseClient";
import { useEffect, useState } from "react";

 export const CardDest = ({destacados}:{destacados:Destacados}) =>{
    // const [product, setProduct] = useState <Productos | null>()
    const [hash, setHash] = useState<string | null>(null);
    const [isLoad, setIsLoad] = useState <boolean> (false)
    useEffect(()=>{
        const product = async (id:number )=>{

            const productos = await productById(id);
            // setProduct(productos);
            if(productos){
                setHash(btoa(JSON.stringify(productos)));
                setIsLoad(true);
            }

        }
        product(destacados.id);
        
    },[]);



return (<>
    <li className={`${style.card} ${isLoad? style.cardLoad: ""}`}>
        <Image  src={`/api/images/${destacados.codigo}`} alt="algun producto destacado" width={290} height={300} unoptimized={true}/>
        {/* <div className={style.divCard} > */}
            <p>{destacados.descripcion}</p>    
        {/* </div> */}
        <div>


       
        { hash ?  (<Link href={{
            pathname:`/costomers/product/${destacados.descripcion}`,
            query:{hash: hash}

        }} > 
            <p className={style.linkProduct}>Ver mas</p>
        </Link>
        ):  <p className={style.linkProduct}>Ver mas</p>}       
        </div>

    </li>


</>)
 }

