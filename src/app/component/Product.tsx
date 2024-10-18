"use state"
import { Productos } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";

import img from "./im.jpg"

export default async function Product({products}:{products:Productos[]} ){
const img = ["/im.jpg"]
    return(<>
        <ul className={style.productList}>
            {products?.map(({id,codigo,cantidad,descripcion,p_Unitario_final} )=>(
                cantidad >0 && (
                <li className={style.product} key={id}>
                    <Image src={`/api/images/${id}`} alt="algun mate im" width={300} height={250} className={style.imagen}/>
                    <div className={style.textCard}>
                        <h3>{descripcion}</h3>
                        <strong className={style.precio}>${p_Unitario_final}</strong>
                    </div>
                    
                </li>)
            ))}
        </ul>
    </>) ;
}