"use client";
import styles from "@/resources/styles/pageMain.module.css";
import { Productos, ProductosDB } from "@/Productos";
import Card from "../../component/Card";
import { useEffect, useRef, useState } from "react";
import { baseClientLimitado, baseClientLimitadoTurso } from "@/lib/firebase/baseClient";
import { DocumentSnapshot } from "@firebase/firestore";

const convertTospace = (str: string) => {
  const dec = decodeURIComponent(str);
  return dec.split("-").join(" ");
};

export default function HomePage({ filtro }: { filtro: string }) {
  const filter = convertTospace(filtro);

  const [products, setProduct] = useState<ProductosDB[]>([]);
  const [lasVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [lasVisibleT, setLastVisibleT] = useState<number>(0);

  const lastCardRef = useRef(null);

  useEffect(() => {
    // console.log("useEfec")
    const productos = async () => {
      const { data, lastVisible } = await baseClientLimitado(null, filter);

      const {dataT,lastVisibleT}= await baseClientLimitadoTurso( 0,filter)
      console.log( dataT)
      setProduct(dataT);
      setLastVisibleT(lastVisibleT)
      setLastVisible(lastVisible);
    };
    productos();
  }, [filter]);

  useEffect(() => {
    const productos = async () => {
      const { data, lastVisible } = await baseClientLimitado(
        lasVisible,
        filter
      );
      const {dataT,lastVisibleT}= await baseClientLimitadoTurso(lasVisibleT,filter)
      console.log( dataT)
      if (dataT.length) {
        setProduct((elem) => [...(elem || []), ...dataT]);
        setLastVisibleT(lastVisibleT)
        setLastVisible(lastVisible);
      }
    };

    if (!lastCardRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        productos();
      }
    });

    observer.observe(lastCardRef.current);

    return () => observer.disconnect();
  }, [filter, lasVisibleT]);

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Nuestro catalogo</h1>

        <ul className={styles.productList}>
          {products?.map((product, i) => (
            <li
              key={i}
              ref={i === products.length - 1 ? lastCardRef : null}
            >
              <Card products={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
