"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProductoCarrito = { nombre?: string; precio_unitario?: string | number; cantidad?: number };


type Props = {
  open: boolean;
  onClose: () => void;
  mobile?: boolean;
};

export default function CarrtoDropDown({ open, onClose, mobile = false }: Props) {
  const router = useRouter();
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  useEffect(() => {
    const actualizar = () => {
      try {
        const productos = JSON.parse(localStorage.getItem("carrito") || "[]");
        setCarrito(Array.isArray(productos) ? productos : []);
      } catch { setCarrito([]); }
    };
    actualizar();
    window.addEventListener("carritoActualizado", actualizar);
    window.addEventListener("storage", actualizar);
    return () => {
      window.removeEventListener("carritoActualizado", actualizar);
      window.removeEventListener("storage", actualizar);
    };
  }, [open]);
  const enviarWhatsApp = () => {
    if (!carrito.length) return;
    const lineas = carrito.map((producto, i) => `${i + 1}. ${producto.nombre || "Producto"}${producto.cantidad && producto.cantidad > 1 ? ` (x${producto.cantidad})` : ""} - $${producto.precio_unitario ?? " consultar"}`);
    const texto = `Hola, quiero solicitar una reserva para estos productos:\n${lineas.join("\n")}`;
    window.open(`https://wa.me/5491158753803?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
  };
  const eliminarProducto = (indice: number) => {
    const carritoActualizado = carrito.filter((_, i) => i !== indice);
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    setCarrito(carritoActualizado);
    window.dispatchEvent(new Event("carritoActualizado"));
  };
  const total = carrito.reduce((suma, p) => suma + Number(p.precio_unitario || 0) * (p.cantidad || 1), 0);
  return (
    <div className={`
           ${mobile ? "relative mt-2 w-full" : "absolute right-0 top-full mt-2 w-90"} z-50 bg-white rounded-[5px] border border-black/20 shadow-lg
        transition-all duration-300 ${mobile ? "origin-top" : "origin-top-right"}
        ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
      `}
    >
        <section className="flex  justify-between  border-b border-black/10 p-3.5">
            <h3>
                Carrito
            </h3>
            <p> cantidad: {carrito.length}</p>
        </section>
        <section className="p-3.5 border-b border-black/10">
            {carrito.length === 0 ? <p>No hay nada en el carrito</p> : <ul className="space-y-2">{carrito.map((producto, i) => <li key={`${producto.nombre}-${i}`} className="flex items-center justify-between gap-3"><span className="flex-1">{producto.nombre || "Producto"}</span><span>${producto.precio_unitario ?? "Consultar"}</span><button type="button" onClick={() => eliminarProducto(i)} aria-label={`Eliminar ${producto.nombre || "producto"} del carrito`} className="text-sm text-red-700 underline">Borrar</button></li>)}</ul>}

        </section>
        <section className="bg-[#F2F2F2] p-3.5">
        <div className=" flex justify-between">
            <p>Subtotal</p>
            <p>${total.toLocaleString("es-AR")}</p> 
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={() => { onClose(); router.push("/carrito"); }} className="bg-white text-[15px] text-center pt-1 pb-1 pl-5 pr-5 border border-black rounded">Ver Carrito</button>
          <button type="button" disabled={!carrito.length} onClick={enviarWhatsApp} className="bg-black pt-1 pb-1 pl-5 pr-5 text-[15px] !text-white border border-white rounded disabled:opacity-50">Solicitar por WhatsApp</button>
        </div>
        </section>
    </div>
  );
}
