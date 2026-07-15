import { Destacados } from "@/Productos";
import { ButtonBlack, ButtonBlackLink, ButtonWhite, ButtonWhiteLink } from "./ui/Button";
import Link from "next/link";
import { formatearPrecio } from "../service/funcionAux";

export function CardDest({prod}:{prod:Destacados}){
    return(
        <Link href={"/producto/"+prod.query_link}>
    <div className="max-w-90 border flex flex-col justify-between border-black/10 rounded">
        <img 
        src={prod.imgURL}/>
        <div className="m-5">
            <p className="text-1xl">{prod.nombre}</p>
            <p className="text-2xl font-bold">${formatearPrecio( prod.precio_unitario)}</p>
        </div>
        <div className="flex  justify-between m-5">
            <div>
            <ButtonBlack  text="Agregar al carrito"/>

            </div>
            <div>
            <ButtonWhite  text="Reservar"/>

            </div>
        </div>
    </div></Link>
    )
}