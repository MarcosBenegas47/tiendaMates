"use client"
import { productById } from "@/lib/firebase/baseClient";
import { ImagenInter, Productos } from "@/Productos";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { imageList } from "@/app/service/getServiceList";
import style from "@/resources/styles/pageProduct.module.css"

const productId = () => {
  const searchParams = useSearchParams();


    const [product, setProduct]=useState<Productos>()
    const [id,setId] = useState<number>();
    const [listImag, setListImag]= useState<string[]>()

useEffect( () =>{

 
  const producto = async ()=>{
    const storedId =   sessionStorage.getItem("productId");
    const porducto = await productById(Number(storedId))
    

    const listImage = await imageList(String(storedId))

    setProduct(porducto);
    setId(Number(storedId));
    setListImag(listImage);
  }
    producto();
},[]) 




  let images:[ImagenInter] = [{
    original: `/api/images/${product?.codigo}`,
    thumbnail: `/api/images/${product?.codigo}`
  }];



  listImag?.forEach(file =>{
  images.push({
    original: `/api/images/folderIn/${product?.codigo}/${file}`,
    thumbnail: `/api/images/folderIn/${id}/${file}`
  })
})

    return (
      <Suspense fallback="loading...">
      <div className={style.infoProduct}>
        <div className={style.imageGallery}>
        <ImageGallery showPlayButton={false} showFullscreenButton={false}  items={images}/>

        </div>
        {/* <Image src={`/api/images/${id}`} alt="algun mate im" width={300} height={290} /> */}
        <section className={style.elementProduct}>
          <h2 className={style.descriptionProduct}>{product?.descripcion}</h2>
          
          <strong className={style.precioProduct}>${product?.p_Unitario_final}</strong>
        </section>
        
      </div>
    
      </Suspense>
      
    )
    
    
}


export default productId;