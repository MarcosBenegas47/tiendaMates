"use client"

import { Drone, Search, ShoppingCart, TableOfContents } from "lucide-react";
import Link from "next/link";
import { cleanOffset } from "../service/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DrowerMenu from "../component/DrowerMenu";


export function NavBar(){
    const router = useRouter();
    const [open, setOpen] = useState(false);
    console.log(open)
        const goToProducts = (ruta:string) =>{
            cleanOffset(ruta)
            router.push(ruta);  
        }
        
    return ( <>
    <header className=" flex  bg-white">
        <nav className="h-24 flex items-center justify-around  w-full ">
            <div className="flex items-center ">
                            <h1 className="text-2xl uppercase">Tienda Mates </h1>

                    <img width="30" height="30" src="https://img.icons8.com/officel/80/mate.png" alt="mate"/>
            </div>
            <div className="block md:hidden">
                <TableOfContents onClick={()=>setOpen(true)}/>
            </div>

            <div className="md:flex gap-5 hidden ">
                <Link href={"/"}>Inicio</Link>
                <button onClick={()=> goToProducts("/productos")}>Productos</button>
                <Link href={"como_curar_el_mate"}>¿Como curar el mate?</Link>

                <Link href={""}>Nosotros</Link>
                

            </div>
            <div className="hidden md:flex gap-3">
                <ShoppingCart/>
                <Search/>

            </div>
        </nav>
        <DrowerMenu open={open} onClose={()=>setOpen(false)}/>
    </header>
    </>)
}