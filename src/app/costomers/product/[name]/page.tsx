"use client"
import { productById } from "@/lib/firebase/baseClient";
import { Productos } from "@/Productos";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import { Suspense, useEffect, useState } from "react";


const productId = () => {
  const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  //   console.log("id: "+id)
        // Recupera el id desde sessionStorage cuando el componente se monta

    

    const [product, setProduct]=useState<Productos>()
    const [id,setId] = useState<number>();
    console.log("que hay aca? "+id);

useEffect( () =>{

 
  const producto = async ()=>{
    const storedId =   sessionStorage.getItem("productId");
    
  
    const porducto = await productById(Number(storedId))
    console.log(porducto);
    setProduct(porducto);
    setId(Number(storedId));
  }
  producto();
},[]) 

    

    
    return (
      < >
      <Image src={`/api/images/${id}`} alt="algun mate im" width={300} height={290} />
      <h2>{product?.descripcion}</h2>
      </>
      
    )
    
    
}


export default productId;