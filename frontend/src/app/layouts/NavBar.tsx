"use client"

import { TableOfContents } from "lucide-react";
import Link from "next/link";
import { cleanOffset } from "../service/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DrowerMenu from "../component/DrowerMenu";
// import CarrtoDropDown from "../component/CarrtoDropDown";


export function NavBar(){
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openCarrito, setOpenCarrito] = useState(false);
    
        const goToProducts = (ruta:string) =>{
            cleanOffset(ruta)
            router.push(ruta);  
        }
        const goToInicio = (ruta:string) =>{
            router.push(ruta)
        }
        
    return ( <>
    <header className=" flex  bg-white">
        <nav className="h-24 flex items-center justify-around  w-full ">
            <div onClick={() => goToInicio("/")} className="flex items-center ">
                            <h1 className="text-2xl uppercase">Tienda Mates </h1>

                    <img width="30" height="30" src="https://img.icons8.com/officel/80/mate.png" alt="mate"/>
            </div>
            <div className="block md:hidden">
                <TableOfContents onClick={()=>setOpen(true)}/>
            </div>

            <div className="md:flex gap-5 hidden ">
                <Link href={"/"}>Inicio</Link>
                <button onClick={()=> goToProducts("/productos")}>Productos</button>
                <Link href={"como_curar_el_mate"}>  ¿Como curar el mate?</Link>

                <Link href={""}>Nosotros</Link>
                

            </div>
            {/* <div className="  hidden md:flex gap-3">
               
                <div className="relative">
                    <ShoppingCart onClick={()=>setOpenCarrito(!openCarrito)}/>

                    <CarrtoDropDown open={openCarrito} onClose={() =>setOpenCarrito(false)}/>

               </div>
            </div> */}
        </nav>

        <DrowerMenu open={open} onClose={()=>setOpen(false)}/>
    </header>
    </>)
}