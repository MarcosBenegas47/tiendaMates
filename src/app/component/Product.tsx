"use client"
import { Productos } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";

import img from "../../resources/images/10.png"
import Link from "next/link";
import ProdcutView from "../costomers/product/[name]/page";
import { query } from "@firebase/firestore";

export default function Product({products}:{products:Productos[]} ){
    const handleClick = (id: number) => {
        // Guardar el id en sessionStorage
        sessionStorage.setItem("productId", String(id));
      };
    return(<>
        <ul className={style.productList}>
            {products?.map(({id,codigo,cantidad,descripcion,p_Unitario_final} )=>(
                cantidad >0 && (
                    <li className={style.product} key={id}>
                    <Link href={`/costomers/product/${descripcion}`} onClick={ ()=> handleClick(id) }>
                    
                        
                            <Image src={`/api/images/${codigo}`} alt="algun mate im" width={300} height={290} className={style.imagen}/>
                            <div className={style.textCard}>
                                <h3>{descripcion}</h3>
                                <span>{codigo}</span>
                                <strong className={style.precio}>${p_Unitario_final}</strong>
                            </div>
                           
                       
                    </Link> 
                    </li> 
                )
            ))}
        </ul>
    </>) ;
}