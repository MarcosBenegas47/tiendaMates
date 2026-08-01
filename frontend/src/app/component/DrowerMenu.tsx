"use client";

import Link from "next/link";
import { cleanOffset } from "../service/utils";
import { useRouter } from "next/navigation";
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
        fixed top-0 right-0 h-screen bg-white border-l shadow-lg
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
          className="rounded-lg px-4 py-3 hover:bg-gray-100"
        >
          Inicio
        </Link>

        <button onClick={()=> goToProducts("/productos")}>Productos</button>
        <Link href={"/como_curar_el_mate"}>¿Como curar el mate?</Link>


        <Link
          href=""
          onClick={onClose}
          className="rounded-lg px-4 py-3 hover:bg-gray-100"
        >
          Nosotros
        </Link>
      </nav>
    </div>
  );
}