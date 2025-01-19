"use client"

import { Destacados, ProductosDB} from "@/Productos";
import Image from "next/image";
import style  from "@/resources/styles/productCardDestacado.module.css";
import Link from "next/link";
import { productById, productByIdTurso } from "@/lib/firebase/baseClient";
import { useEffect, useState } from "react";

 export const CardDest = ({destacados}:{destacados:Destacados}) =>{
     const [product, setProduct] = useState <ProductosDB | null>()
    const [hash, setHash] = useState<string | null>(null);
    const [isLoad, setIsLoad] = useState <boolean> (false)
    useEffect(()=>{
        const product = async (id:number )=>{

            // const productos = await productById(id);
            const productos = await productByIdTurso(id);

             setProduct(productos);
            if(productos){
                setHash(btoa(JSON.stringify(productos)));
                setIsLoad(true);
            }

        }
        product(destacados.id);
        
    },[destacados.id]);



return (<>
    <li className={`${style.card} ${isLoad? style.cardLoad: ""}`}>
        <Image className={style.imgDest}src={`/api/images/${destacados.codigo}`} alt="algun producto destacado" width={290} height={300} unoptimized={true}/>
        {/* <div className={style.divCard} > */}
            <p className={style.destDescrip}>{destacados.descripcion}</p>    
        {/* </div> */}
        <div>
            { product ?  (<Link href={"/producto/"+product.queryLink}

             > 
                <p className={style.linkProduct}>Ver mas</p>
            </Link>
            ):  <p className={style.linkProduct}>Ver mas</p>}       
        </div>
    </li>


</>)
 }

