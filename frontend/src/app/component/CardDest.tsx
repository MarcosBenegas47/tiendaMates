"use client"
import { Destacados } from "@/Productos";
import { ButtonBlack, ButtonBlackLink, ButtonWhite, ButtonWhiteLink } from "./ui/Button";
import Link from "next/link";
import { formatearPrecio } from "../service/funcionAux";

export function CardDest({prod}:{prod:Destacados}){
const agregarCarrito = ()=>{
    let miArray = JSON.parse(localStorage.getItem('carrito') || "[]");

// 2. Agregar el nuevo elemento al array
    miArray.push(prod);

// 3. Sobrescribir el localstorage con el array actualizado
    localStorage.setItem('carrito', JSON.stringify(miArray));   
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
            {/* <div>
                <button onClick={ agregarCarrito} className="bg-black pt-3 pb-3 pl-5 pr-5 !text-white border border-white rounded">Agregar al carrito</button>
            </div> */}
            <div>
            <ButtonWhite   text="Reservar"/>

            </div>
        </div>
    </div></Link>
    )
}