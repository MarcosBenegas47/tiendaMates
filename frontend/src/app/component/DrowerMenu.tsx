"use client";

import Link from "next/link";
import { cleanOffset } from "../service/utils";
import { useRouter } from "next/navigation";
import { Heart, House, Package, ShoppingCart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DrowerMenu({ open, onClose }: Props) {
        const router = useRouter();
        const [cantidadCarrito, setCantidadCarrito] = useState(0);

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
  return (
    <>
    {open && <button type="button" aria-label="Cerrar menú" onClick={onClose} className="fixed inset-0 z-40 cursor-default bg-black/20" />}
    <div
      className={`
        fixed z-50 top-0 right-0 h-screen bg-white border-l shadow-lg
        transition-all duration-300 ease-in-out overflow-hidden
        ${open ? "w-[300px]" : "w-0"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="font-semibold">Menú</h2>

        <button onClick={onClose} className="text-xl">
          ✕
        </button>
      </div>

      {/* Links */}
      <nav className="flex max-h-[calc(100vh-64px)] flex-col gap-2 overflow-y-auto p-4">
        <Link
          href="/"
          onClick={onClose}
          className="rounded-lg flex items-center  gap-1 px-4 py-3 hover:bg-gray-100"
        >
          <House/>
          <span>Inicio</span>
          
        </Link>

        <button type="button" onClick={() => { onClose(); router.push("/carrito"); }} className="w-full rounded-lg flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-100">
          <ShoppingCart /> <span className="flex-1">Carrito</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">{cantidadCarrito}</span>
        </button>

        <button className="rounded-lg flex items-center  gap-1 px-4 py-3 text-left hover:bg-gray-100"
 onClick={()=> { onClose(); goToProducts("/productos"); }}><Package/> Productos</button>
        <Link onClick={onClose} className="rounded-lg flex items-center  gap-1 px-4 py-3 hover:bg-gray-100" href={"/como_curar_el_mate"}><Sparkles/> ¿Como curar el mate?</Link>


        <Link
          href=""
          onClick={onClose}
          className=" rounded-lg px-4 flex items-center  gap-1 py-3 hover:bg-gray-100"
        >
          <Heart/>
          Nosotros
        </Link>
      </nav>
    </div>
    </>
  );
}
