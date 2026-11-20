"use client"

import { ProductosInter } from "@/Productos"
import ImageGallery from "react-image-gallery";
// import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import  "@/styles/imagesGalery.css"
import { ButtonBlack, ButtonWhite } from "@/app/component/ui/Button";
import { CalendarClock, ShoppingCart } from "lucide-react";
import { formatearPrecio } from "@/app/service/funcionAux";
import { useState } from "react";
import Link from "next/link";
export default function Producto({product}:{product: ProductosInter | null}) {
   const [agregado, setAgregado] = useState(false);
   let listaImages = []
   listaImages.push(product?.imgURL)
   const listaImagagenesConcatenada = listaImages.concat(product?.galery)
   const images = listaImagagenesConcatenada.map(imagen=>({
      original: imagen || "",
      thumbnail: imagen || ""
   }))|| []
   
   const abrirWhatsApp = (mensajeBase: string) => {
      const mensaje = `${mensajeBase} ${window.location.href}`;
      const url = new URL("https://wa.me/5491158753803");
      url.searchParams.set("text", mensaje);

      window.open(url.toString(), "_blank", "noopener,noreferrer");
   };

   const enviarMensajeDeCompra = () => {
      abrirWhatsApp(
         "¡Hola! Vi este producto en la tienda y me gustaría comprarlo:"
      );
   };

   const agregarAlCarrito = () => {
      if (!product) return;
      try {
         const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
         carrito.push(product);
         localStorage.setItem("carrito", JSON.stringify(carrito));
      } catch {
         localStorage.setItem("carrito", JSON.stringify([product]));
      }
      window.dispatchEvent(new Event("carritoActualizado"));
      setAgregado(true);
      window.setTimeout(() => setAgregado(false), 2500);
   };
       
   return (<>
      <section className="flex justify-center border-t border-black/10 pt-9 w-full bg-white">
         <section className="flex flex-col md:flex-row justify-center gap-14 w-full p-2 md:p-0 md:max-w-[70%]">
            <div className="   ">
             <ImageGallery 

               items={images}
               showBullets={true}
               showPlayButton={false}
               showFullscreenButton={false} 
               thumbnailPosition="bottom"/>
         </div>
         <div className="  flex flex-col gap-6">
            <h2 className="font-bold text-3xl md:text-4xl">
               {product?.nombre}
            </h2>
            <p className="font-bold text-4xl">${formatearPrecio( product?.precio_unitario ?? "0")}</p>
            <p className="text-black/45 text-sm">{product?.descripcion}</p>
         <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-[#F2F2F2] p-4 rounded-md ">
               <h3 className="text-[#7A7A7A]">Estilo</h3>
               <p>{product?.configuracion?.estilo?.nombre ?? ""}</p>

            </div>
               <div className="bg-[#F2F2F2] p-4 rounded-md ">
                  <h3 className="text-[#7A7A7A]">Material</h3>
                  <p>{product?.configuracion?.material?.nombre ?? ""}</p>

               </div>
               <div className="bg-[#F2F2F2] p-4 rounded-md ">
                  <h3 className="text-[#7A7A7A]">Virola</h3>
                  <p>{product?.configuracion?.virola?.nombre ?? ""}</p>

               </div>
               <div className="bg-[#F2F2F2] p-4 rounded-md " >
                  <h3 className="text-[#7A7A7A]">Capacidad</h3>
                  <p>{product?.configuracion?.capacidad?.descripcion ?? ""}</p>

               </div>
               
            </div>
             <div className="grid w-full grid-cols-2 items-center gap-3">
                <button onClick={() => enviarMensajeDeCompra()}  className="h-12 w-full min-w-0 cursor-pointer flex items-center justify-center gap-1 bg-black px-2 text-center text-xs !text-white border border-white rounded whitespace-nowrap sm:gap-2 sm:px-5 sm:text-sm"> <CalendarClock className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"/> Reservar producto 🧉</button>
                <div className="relative min-w-0">
                  <button onClick={agregarAlCarrito} className="h-12 w-full cursor-pointer flex items-center justify-center gap-1 bg-white px-2 text-center text-xs !text-black border border-black rounded whitespace-nowrap sm:gap-2 sm:px-5 sm:text-sm"><ShoppingCart className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"/>Agregar al carrito</button>
                  {agregado && <div role="status" className="absolute bottom-full left-0 z-20 mb-2 w-56 rounded border border-black/10 bg-white p-3 text-sm shadow-lg">
                    <p className="font-medium">¡Agregado al carrito!</p>
                    <Link href="/carrito" className="mt-1 inline-block underline">Ver carrito</Link>
                  </div>}
                </div>
            </div>
         </div>
         
         </section>
         
      </section>
   </>)

}   
