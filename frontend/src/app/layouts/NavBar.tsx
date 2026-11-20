"use client"

import { ShoppingCart, TableOfContents } from "lucide-react";
import Link from "next/link";
import { cleanOffset } from "../service/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DrowerMenu from "../component/DrowerMenu";
 import CarrtoDropDown from "../component/CarrtoDropDown";

export function NavBar(){
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openCarrito, setOpenCarrito] = useState(false);
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const carritoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!openCarrito) return;
        const cerrarAlHacerClickAfuera = (event: PointerEvent) => {
            if (event.target instanceof Node && !carritoRef.current?.contains(event.target)) {
                setOpenCarrito(false);
            }
        };
        document.addEventListener("pointerdown", cerrarAlHacerClickAfuera);
        return () => document.removeEventListener("pointerdown", cerrarAlHacerClickAfuera);
    }, [openCarrito]);

    useEffect(() => {
        const actualizarCantidad = () => {
            try {
                const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
                setCantidadCarrito(Array.isArray(carrito) ? carrito.length : 0);
            } catch {
                setCantidadCarrito(0);
            }
        };
        actualizarCantidad();
        window.addEventListener("carritoActualizado", actualizarCantidad);
        window.addEventListener("storage", actualizarCantidad);
        return () => {
            window.removeEventListener("carritoActualizado", actualizarCantidad);
            window.removeEventListener("storage", actualizarCantidad);
        };
    }, []);
    
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
                <button className="cursor-pointer" onClick={()=> goToProducts("/productos")}>Productos</button>
                <Link href={"como_curar_el_mate"}>  ¿Como curar el mate?</Link>

                <Link href={""}>Nosotros</Link>
                

            </div>
            <div className="  hidden md:flex gap-3">
               
                 <div ref={carritoRef} className="relative">
                    <button type="button" aria-label={`Abrir carrito, ${cantidadCarrito} productos`} onClick={()=>setOpenCarrito(!openCarrito)} className="relative cursor-pointer">
                        <ShoppingCart />
                        {cantidadCarrito > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">{cantidadCarrito}</span>}
                    </button>

                    <CarrtoDropDown open={openCarrito} onClose={() =>setOpenCarrito(false)} />

               </div>
            </div>
        </nav>

        <DrowerMenu open={open} onClose={()=>setOpen(false)}/>
    </header>
    </>)
}
