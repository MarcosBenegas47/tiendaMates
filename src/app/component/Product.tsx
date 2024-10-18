"use state"
import { Productos } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";

import img from "../../resources/images/10.png"

export default async function Product({products}:{products:Productos[]} ){
    return(<>
        <ul className={style.productList}>
            {products?.map(({id,codigo,cantidad,descripcion,p_Unitario_final} )=>(
                cantidad >0 && (
                <li className={style.product} key={id}>
                    <Image src={`/api/images/${id}`} alt="algun mate im" width={300} height={290} className={style.imagen}/>
                    <div className={style.textCard}>
                        <h3>{descripcion}</h3>
                        {id}
                        <strong className={style.precio}>${p_Unitario_final}</strong>
                    </div>
                    
                </li>)
            ))}
        </ul>
    </>) ;
}