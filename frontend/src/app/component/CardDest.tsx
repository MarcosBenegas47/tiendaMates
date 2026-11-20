"use client"
"use client";

import { Destacados } from "@/Productos";
import { ButtonBlack, ButtonBlackLink, ButtonWhite, ButtonWhiteLink } from "./ui/Button";
import Link from "next/link";
import { formatearPrecio } from "../service/funcionAux";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CardDest({prod}:{prod:Destacados}){
const router = useRouter();
const [agregado, setAgregado] = useState(false);
const agregarCarrito = ()=>{
    let miArray = JSON.parse(localStorage.getItem('carrito') || "[]");

// 2. Agregar el nuevo elemento al array
    miArray.push(prod);

// 3. Sobrescribir el localstorage con el array actualizado
    localStorage.setItem('carrito', JSON.stringify(miArray));   
    window.dispatchEvent(new Event("carritoActualizado"));
    setAgregado(true);
    window.setTimeout(() => setAgregado(false), 2500);
}

 return(
        <Link href={"/producto/"+prod.query_link}>
    <div className="max-w-90 h-full border flex flex-col justify-between border-black/10 rounded">
        <img 
        src={prod.imgURL}/>
        <div className="m-5">
            <p className="text-1xl">{prod.nombre}</p>
            <p className="text-2xl font-bold">${formatearPrecio( prod.precio_unitario)}</p>
        </div>
        {/* <div className="flex justify-center m-5"> */}
            <div className=" m-5">
            <div className="relative">
            <button onClick={(event) => { event.preventDefault(); agregarCarrito(); }} className="bg-black pt-3 pb-3 pl-5 pr-5 text-white border border-white rounded">Agregar al carrito</button>
            {agregado && <div role="status" className="absolute bottom-full left-0 z-20 mb-2 w-56 rounded border border-black/10 bg-white p-3 text-sm shadow-lg" onClick={(event) => event.preventDefault()}>
                <p className="font-medium">¡Agregado al carrito!</p>
                <button type="button" className="mt-1 inline-block underline" onClick={(event) => { event.preventDefault(); event.stopPropagation(); router.push("/carrito"); }}>Ver carrito</button>
            </div>}

            </div>
        </div>
    </div></Link>
    )
}
