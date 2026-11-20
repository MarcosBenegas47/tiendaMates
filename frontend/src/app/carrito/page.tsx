"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ProductoCarrito = {
  nombre?: string;
  precio_unitario?: string | number;
  cantidad?: number;
  imgURL?: string;
};

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  useEffect(() => {
    const actualizar = () => {
      try {
        const items = JSON.parse(localStorage.getItem("carrito") || "[]");
        setCarrito(Array.isArray(items) ? items : []);
      } catch {
        setCarrito([]);
      }
    };
    actualizar();
    window.addEventListener("carritoActualizado", actualizar);
    window.addEventListener("storage", actualizar);
    return () => {
      window.removeEventListener("carritoActualizado", actualizar);
      window.removeEventListener("storage", actualizar);
    };
  }, []);

  const borrar = (indice: number) => {
    const actualizado = carrito.filter((_, i) => i !== indice);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
    setCarrito(actualizado);
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const total = carrito.reduce((suma, producto) => suma + Number(producto.precio_unitario || 0) , 0);
  const solicitar = () => {
    if (!carrito.length) return;
    const detalle = carrito.map((p, i) => `${i + 1}. ${p.nombre || "Producto"}${p.cantidad && p.cantidad > 1 ? ` (x${p.cantidad})` : ""} - $${p.precio_unitario ?? "consultar"}`).join("\n");
    window.open(`https://wa.me/5491158753803?text=${encodeURIComponent(`Hola, quiero solicitar una reserva para estos productos:\n${detalle}`)}`, "_blank", "noopener,noreferrer");
    localStorage.removeItem("carrito");
    setCarrito([]);
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-5xl px-4 py-10 md:px-8">
      <h1 className="mb-8 text-3xl font-bold">Mi carrito</h1>
      {!carrito.length ? (
        <div className="rounded border border-black/10 p-8 text-center">
          <p className="mb-5 text-black/60">Todavía no agregaste productos al carrito.</p>
          <Link href="/productos" className="inline-block rounded border border-black bg-black px-5 py-3 !text-white">Ver productos</Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {carrito.map((producto, indice) => (
              <li key={`${producto.nombre}-${indice}`} className="flex items-center gap-4 py-5">
                {producto.imgURL && <img src={producto.imgURL} alt={producto.nombre || "Producto"} className="h-20 w-20 rounded object-cover" />}
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{producto.nombre || "Producto"}</p>
                  {producto.cantidad && producto.cantidad > 1 && <p className="text-sm text-black/50">Cantidad: {producto.cantidad}</p>}
                  <p className="mt-1">${Number(producto.precio_unitario || 0).toLocaleString("es-AR")}</p>
                </div>
                <button type="button" onClick={() => borrar(indice)} className="text-sm text-red-700 underline">Quitar</button>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded bg-[#F2F2F2] p-5">
            <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
            <div className="mb-5 flex justify-between border-b border-black/10 pb-4"><span>Subtotal</span><strong>${total.toLocaleString("es-AR")}</strong></div>
            <button type="button" onClick={solicitar} className="w-full rounded bg-black px-5 py-3 text-white">Solicitar por WhatsApp</button>
            <Link href="/productos" className="mt-4 block text-center text-sm underline">Seguir comprando</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
