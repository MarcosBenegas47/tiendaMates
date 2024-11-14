"use client"
import { Productos } from "@/Productos";
import style from "../../resources/styles/product.module.css"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Card({products}:{products:Productos} ){
    const {id,codigo,cantidad,descripcion,p_Unitario_final,categoria} = products;
    const router = useRouter();
  

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
            router.push(`/?id=${id}`);
    };
    const encodeToBase64 = (obj: Productos) => {

            return btoa(JSON.stringify(obj));
      };
    return(<>

        <div className={style.product} >
            <Link href={{ 
                pathname: `/costomers/product/${products.descripcion}`,
                query:{hash: encodeToBase64( products)} }} 
                onClick={ ()=> handleClick(id,codigo,cantidad,descripcion,p_Unitario_final,categoria )}>
        
                    <div>
                    <span className={style.cod}>cod: {products.codigo}</span>

                        <Image src={`/api/images/${products.codigo}`} alt="algun mate" width={300} unoptimized={true} height={400} className={style.imagen}/>
                    </div>
                    <div className={style.textCard}>
                        <h3>{products.descripcion}</h3>
                        <strong className={style.precio}>${products.p_Unitario_final}</strong>
                        {id}
                    </div>
            </Link> 
        </div> 
    </>);
}