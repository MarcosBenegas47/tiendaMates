import {  ProductosInter } from "@/Productos";
import { ButtonWhiteLink } from "./ui/Button";

export function CardProd({prod}:{prod:ProductosInter}){

    return(
    <div className="max-w-90 border flex flex-col justify-between border-black/10 rounded">
        <img 
        src={prod.imgURL}/>
        <div className="m-5">
            <p className="text-1xl">{prod.nombre}</p>
            <p className="text-2xl font-bold">${prod.precio_unitario}</p>
        </div>
        <div className="flex justify-center  m-5">
            <ButtonWhiteLink link={"producto/"+prod.query_link} text="Ver mas"/>
        </div>
    </div>
    )
}