"use client";
import { ImagenInter, Productos } from "@/Productos";
import { Suspense, useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { imageList } from "@/app/service/getServiceList";
import style from "@/resources/styles/pageProduct.module.css";
import { useSearchParams } from "next/navigation";
import { productBySlug } from "@/lib/firebase/baseClient";

//export default async function Home({params}: {params:{categoria:string}}) {
const ProductView = ({ params }: { params: { name: string } }) => {
  const searchParams = useSearchParams();
  const { name } = params;
  const hash = searchParams.get("hash");

  const [product, setProduct] = useState<Productos | null>();
  const [listImag, setListImag] = useState<string[]>([]);

  useEffect(() => {
    let productos: Productos | undefined;

    if (hash) {
      productos = JSON.parse(atob(hash));
    }

    const productList = async (prodCod: string = "null") => {
      const producto = await productBySlug(name);
      if (producto) {
        const listImage = await imageList(producto.codigo);
        setListImag(listImage);
        setProduct(producto);
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
    <Suspense fallback="loading...">
      <div className={style.infoProduct}>
        {/* <Sidebar/> */}
        {/* <NavBar/> */}
        <div className={style.imageGallery}>
          <ImageGallery
            thumbnailPosition={"left"}
            showBullets={true}
            showPlayButton={false}
            showFullscreenButton={false}
            items={images}
          />
        </div>
        <section className={style.elementProduct}>
          <h2 className={style.descriptionProduct}>{product?.descripcion}</h2>

          <strong className={style.precioProduct}>
            ${product?.p_Unitario_final}
          </strong>
          <span> stock disponible</span>
          <span>cantidad: {product?.cantidad} unidades</span>
        </section>
      </div>
    </Suspense>
  );
};

export default ProductView;
