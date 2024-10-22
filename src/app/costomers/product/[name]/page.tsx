"use client"
import { productById } from "@/lib/firebase/baseClient";
import { ImagenInter, Productos } from "@/Productos";
import { Suspense, useEffect, useState } from "react";
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { imageList } from "@/app/service/getServiceList";
import style from "@/resources/styles/pageProduct.module.css"
import NavBar from "@/app/component/NavBar";

const ProductId = () => {


    const [product, setProduct]=useState<Productos>();
    const [listImag, setListImag]= useState<string[]>();

  useEffect( () =>{

  
    const producto = async ()=>{
      const storedId = sessionStorage.getItem("productId");
      const porducto = await productById(Number(storedId));
      

      const listImage = await imageList(String(porducto.codigo));
      setProduct(porducto);
      setListImag(listImage);
    }
      producto();
  },[]);


  const images:ImagenInter[] = [{
    original: `/api/images/${product?.codigo || null}`,
    thumbnail: `/api/images/${product?.codigo || null}`
  }];



  listImag?.forEach(file =>{
  images.push({
    original: `/api/images/folderIn/${product?.codigo}/${file}`,
    thumbnail: `/api/images/folderIn/${product?.codigo}/${file}`
  })
});

    return (
      <Suspense fallback="loading...">
      <div className={style.infoProduct}>
          <NavBar/>
          <div className={style.imageGallery}>
            <ImageGallery showPlayButton={false} showFullscreenButton={false}  items={images}/>

          </div>
        <section className={style.elementProduct}>
          <h2 className={style.descriptionProduct}>{product?.descripcion}</h2>
          
          <strong className={style.precioProduct}>${product?.p_Unitario_final}</strong>
        </section>
      </div>
    
      </Suspense>
      
    );
    
    
}


export default ProductId;