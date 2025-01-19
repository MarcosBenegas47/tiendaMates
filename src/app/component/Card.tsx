"use client"
import { Productos, ProductosDB } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Card({products}:{products:ProductosDB} ){
    const router = useRouter();

    return(<>

        <div className={style.product} >
            <Link href={{ 
                pathname: `/producto/${products.queryLink}`,
                // query:{hash: encodeToBase64( products)}
            
            }} 
                // onClick={ ()=> handleClick(id,codigo,cantidad,descripcion,p_Unitario_final,categoria )}
                >
        
                    <div>
                    <span className={style.cod}>cod: {products.codigo}</span>

                        <Image src={`/api/images/${products.codigo}`} alt="algun mate" width={300} unoptimized={true} height={400} className={style.imagen}/>
                    </div>
                    <div className={style.textCard}>
                        <h3>{products.descripcion}</h3>
                        <strong className={style.precio}>${products.precio}</strong>
                    </div>
            </Link> 
        </div> 
    </>);
}