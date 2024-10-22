"use client"
import { Productos } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";

import Link from "next/link";

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
                
                            <div>
                            <span className={style.cod}>{codigo}</span>

                                <Image src={`/api/images/${codigo}`} alt="algun mate im" width={300} height={290} className={style.imagen}/>
                            </div>
                            <div className={style.textCard}>
                                <h3>{descripcion}</h3>
                                <strong className={style.precio}>${p_Unitario_final}</strong>
                            </div>
                           
                       
                    </Link> 
                    </li> 
                )
            ))}
        </ul>
    </>);
}