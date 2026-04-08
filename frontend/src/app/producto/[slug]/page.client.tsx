"use client"

import { ProductosInter } from "@/Productos"
import ImageGallery from "react-image-gallery";
// import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import  "@/styles/imagesGalery.css"
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
            <h2 className="font-bold text-5xl">
               {product?.nombre}
            </h2>
            <p className="font-bold text-4xl">${product?.precio_unitario}</p>
            <p className="text-black/45 text-sm">{product?.descripcion}</p>
         <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div>
               <h3>Estilo</h3>
               <p>{product?.configuracion.estilo}</p>

            </div>
               <div>
                  <h3>Material</h3>
                  <p>{product?.configuracion.material}</p>

               </div>
               <div>
                  <h3>Virola</h3>
                  <p>{product?.configuracion.virola}</p>

               </div>
               <div>
                  <h3>Capacidad</h3>
                  <p>{product?.configuracion.capacidad}</p>

               </div>
               
            </div>
         </div>
         
         </section>
         
      </section>
   </>)

}   