"use client"

import { ProductosInter } from "@/Productos"
import ImageGallery from "react-image-gallery";
// import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import  "@/styles/imagesGalery.css"
import { ButtonBlack, ButtonWhite } from "@/app/component/ui/Button";
import { CalendarClock } from "lucide-react";
export default function Producto({product}:{product: ProductosInter | null}) {
   let listaImages = []
   listaImages.push(product?.imgURL)
   const listaImagagenesConcatenada = listaImages.concat(product?.galery)
   console.log(product)
   const images = listaImagagenesConcatenada.map(imagen=>({
      original: imagen || "",
      thumbnail: imagen || ""
   }))|| []
       
   return (<>
      <section className="flex justify-center border-t border-black/10 pt-9 w-full bg-white">
         <section className="flex  flex-col md:flex-row justify-center gap-14 max-w-[70%]">
            <div >
             <ImageGallery 

               items={images}
               showBullets={true}
               showPlayButton={false}
               showFullscreenButton={false} 
               thumbnailPosition="bottom"/>
         </div>
         <div className="  flex flex-col gap-6">
            <h2 className="font-bold text-4xl">
               {product?.nombre}
            </h2>
            <p className="font-bold text-4xl">${product?.precio_unitario}</p>
            <p className="text-black/45 text-sm">{product?.descripcion}</p>
         <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-[#F2F2F2] p-4 rounded-md ">
               <h3 className="text-[#7A7A7A]">Estilo</h3>
               <p>{product?.configuracion.estilo}</p>

            </div>
               <div className="bg-[#F2F2F2] p-4 rounded-md ">
                  <h3 className="text-[#7A7A7A]">Material</h3>
                  <p>{product?.configuracion.material}</p>

               </div>
               <div className="bg-[#F2F2F2] p-4 rounded-md ">
                  <h3 className="text-[#7A7A7A]">Virola</h3>
                  <p>{product?.configuracion.virola}</p>

               </div>
               <div className="bg-[#F2F2F2] p-4 rounded-md " >
                  <h3 className="text-[#7A7A7A]">Capacidad</h3>
                  <p>{product?.configuracion.capacidad}</p>

               </div>
               
            </div>
            <div className="flex flex-col md:flex-row gap-5">
               <button  className=" flex items-center gap-2 bg-black pt-3 pb-3 pl-5 pr-5 text-sm  !text-white border border-white rounded"> <CalendarClock/> Reservar producto 🧉</button>
                <button  className="bg-white text-sm text-center pt-3 pb-3 pl-5 pr-5 border border-black rounded">💬 Consultar por WhatsApp</button>
            </div>
         </div>
         
         </section>
         
      </section>
   </>)

}   