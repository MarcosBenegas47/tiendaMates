"use client"
import { Productos } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";

import Link from "next/link";



export default function Product({products}:{products:Productos[]} ){

    const handleClick = (id: number ,codigo:string,cantidad:number,descripcion:string,p_Unitario_final:string,categoria:string[] ) => {
        

        const  products ={
        id: id ,
        codigo:codigo,
        cantidad:cantidad,
        descripcion:descripcion,
        p_Unitario_final:p_Unitario_final,
        category:categoria
        }
        // Guardar el id en sessionStorage
        localStorage.setItem("productId", String(id));
        localStorage.setItem("product",JSON.stringify(products))
      };
    return(<>
        <ul className={style.productList}>
            {products?.map(({id,codigo,cantidad,descripcion,p_Unitario_final, categoria} )=>(
                cantidad >0 && (
                    <li className={style.product} key={id}>
                    <Link href={`/costomers/product/${descripcion}`} 
                        onClick={ ()=> handleClick(id,codigo,cantidad,descripcion,p_Unitario_final,categoria )}
                         
                         onContextMenu={()=>handleClick(id,codigo,cantidad,descripcion,p_Unitario_final,categoria)}
                         >
                
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