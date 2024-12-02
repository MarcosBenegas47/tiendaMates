"use client"
import { ImagenInter, Productos } from "@/Productos";
import { Suspense, useEffect, useState } from "react";
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { imageList } from "@/app/service/getServiceList";
import style from "@/resources/styles/pageProduct.module.css"
import NavBar from "@/app/component/NavBar";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/app/component/SideBar";


const ProductView = () => {
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash")

  

  const [product, setProduct]=useState<Productos| null>()
  const [listImag, setListImag]= useState<string[]>([]);

  


  useEffect( () =>{
    
    let productos:Productos | undefined ;

    if(hash){
      productos = JSON.parse(atob(hash))
      
    }

    const productList =  async (prodCod:string ="null" )=>{
      const listImage = await imageList(prodCod);
      setListImag(listImage)
    }


      productList(productos?.codigo)
      setProduct(productos)
    
},[hash]);

  const images:ImagenInter[] = product?.codigo? [{
    original: `/api/images/${product?.codigo || null}`,
    thumbnail: `/api/images/${product?.codigo || null}`
  }] : [];



  listImag?.forEach(file =>{
  images.push({
    original: `/api/images/folderIn/${product?.codigo}/${file}`,
    thumbnail: `/api/images/folderIn/${product?.codigo}/${file}`
  })
});

  
    return (
      <Suspense fallback="loading...">
      <div className={style.infoProduct}>
          {/* <Sidebar/> */}
          {/* <NavBar/> */}
          <div className={style.imageGallery}>
            <ImageGallery  showBullets={true} showPlayButton={false} showFullscreenButton={false}  items={images}/>

          </div>
        <section className={style.elementProduct}>
          <h2 className={style.descriptionProduct}>{product?.descripcion}</h2>
          
          <strong className={style.precioProduct}>${product?.p_Unitario_final}</strong>
        </section>
      </div>
    
      </Suspense>
      
    );
    
    
}


export default ProductView;
