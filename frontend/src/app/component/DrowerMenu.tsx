"use client";

import Link from "next/link";
import { cleanOffset } from "../service/utils";
import { useRouter } from "next/navigation";
import { Heart, House, Package, Sparkles } from "lucide-react";
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DrowerMenu({ open, onClose }: Props) {
        const router = useRouter();
    
            const goToProducts = (ruta:string) =>{
                cleanOffset(ruta)
                router.push(ruta);  
            }
  return (
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
      <nav className="flex flex-col p-4 gap-2">
        <Link
          href="/"
          onClick={onClose}
          className="rounded-lg flex items-center  gap-1 px-4 py-3 hover:bg-gray-100"
        >
          <House/>
          <span>Inicio</span>
          
        </Link>

        <button className="rounded-lg flex items-center  gap-1 px-4 py-3 text-left hover:bg-gray-100"
 onClick={()=> goToProducts("/productos")}><Package/> Productos</button>
        <Link className="rounded-lg flex items-center  gap-1 px-4 py-3 hover:bg-gray-100" href={"/como_curar_el_mate"}><Sparkles/> ¿Como curar el mate?</Link>


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
  );
}