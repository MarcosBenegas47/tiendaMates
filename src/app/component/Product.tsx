"use state"
import { Productos } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";

import img from "./im.jpg"

export default async function Product({products}:{products:Productos[]} ){
//console.log(products);
const img = ["/im.jpg"]
    return(<>
        <ul className={style.productList}>
            {products?.map(({id,codigo,cantidad,descripcion,p_Unitario_final} )=>(
                <li>
                    <Image src={`/api/images/${id}`} alt="algun mate im" width={400} height={350} priority/>
                    {id}
                    <h3>{descripcion}</h3>
                    <strong>${p_Unitario_final}</strong>
                </li>
            ))}
        </ul>
    </>) ;
}