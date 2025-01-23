"use client";
import { ImagenInter, Productos, ProductosDB } from "@/Productos";
import { Suspense, useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { imageList } from "@/app/service/getServiceList";
import style from "@/resources/styles/pageProduct.module.css";
import { useSearchParams } from "next/navigation";
import { productBySlug, productBySlugTurso } from "@/lib/firebase/baseClient";
import { Skeleton, Typography } from "@mui/material";

//export default async function Home({params}: {params:{categoria:string}}) {
const ProductView = ({ params }: { params: { name: string } }) => {
  const searchParams = useSearchParams();
  const { name } = params;
  const hash = searchParams.get("hash");

  const [product, setProduct] = useState<ProductosDB | null>();
  const [listImag, setListImag] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {



    const productList = async (prodCod: string = "null") => {
     // const producto = await productBySlug(name);
      const producto:ProductosDB = await productBySlugTurso(name);
      if (producto) {
        const listImage = await imageList(producto.codigo);
        
        setListImag(listImage);
        setProduct(producto);
        setLoading(true);
      }
    };

    productList();
  }, [name]);

  const images: ImagenInter[] = product?.codigo
    ? [
        {
          original: `/api/images/${product?.codigo || null}`,
          thumbnail: `/api/images/${product?.codigo || null}`,
        },
      ]
    : [];

  listImag?.forEach((file) => {
    images.push({
      original: `/api/images/folderIn/${product?.codigo}/${file}`,
      thumbnail: `/api/images/folderIn/${product?.codigo}/${file}`,
    });
    
  });

  return (
    // <Skeleton fallback="loading...">
      <div className={style.infoProduct}>
        {/* <Sidebar/> */}
        {/* <NavBar/> */}
        <div className={style.imageGallery}>
          {loading?  (
          <ImageGallery
            thumbnailPosition={"left"}
            showBullets={true}
            showPlayButton={false}
            showFullscreenButton={false}
            items={images}
          />): <Skeleton variant="rectangular" width={570} height={570} />}
        </div>
        <section className={style.elementProduct}>
        
          {loading ?  (<h2 className={style.descriptionProduct}>{product?.descripcion}</h2>) : <Skeleton width={210} />}
          
          {loading ?  (
            <strong className={style.precioProduct}>
            ${product?.precio}
          </strong>) : <Skeleton width={210} />}
          
          {loading ?  (<span> stock disponible</span>) : <Skeleton width={210} />}
          
          {loading ?  ( <span>cantidad: {product?.cantidad} unidades</span>) : <Skeleton width={210} />}
         
        </section>
      </div>
    // </Skeleton>
  );
};

export default ProductView;
