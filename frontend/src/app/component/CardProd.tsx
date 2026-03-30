import { ProductosInter } from "@/Productos";
import { ButtonWhiteLink } from "./ui/Button";
import Link from "next/link";

export function CardProd({ prod }: { prod: ProductosInter }) {

    return (
        // max-w-90
            <Link href={"/producto/"+prod.query_link} className=" border flex md:flex-col justify-between border-black/10 max-w-sm  rounded gap-4  h-44 md:h-auto" >
                <div className=" md:w-auto md:h-auto flex items-center justify-center mx-auto">
                    <img className="max-w-full max-h-full object-contain" src={prod.imgURL} />
                </div>
                <div className="flex flex-col center p-4 justify-between flex-1">
                    <div >
                        <p className="text-sm md:text-xl  line-clamp-2">{prod.nombre}</p>
                        <p className="text-xl md:text-3xl mt-1 font-bold">${prod.precio_unitario}</p>
                    </div>
                    <div className="mt-3 md:flex md:justify-center  md:w-full">
                        <button className="bg-white w-full  text-center pt-3 pb-3 pl-5 pr-5 border border-black rounded">Ver mas</button>
                        {/* <ButtonWhiteLink link="" text=" /> */}
                    </div>

                </div>

            </Link>
        
    )
}