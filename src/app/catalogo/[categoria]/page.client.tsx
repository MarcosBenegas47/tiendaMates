"use client"
import styles from "@/resources/styles/pageMain.module.css";
import NavBar from "../../component/NavBar";
import { Productos } from "@/Productos";
import Card from "../../component/Card";
import {  useEffect, useRef, useState } from "react";
import { baseClientLimitado } from "@/lib/firebase/baseClient";
import { DocumentSnapshot } from "@firebase/firestore";
import Sidebar from "@/app/component/SideBar";

const convertTospace =  (str:string ) =>{
  const dec = decodeURIComponent(str)
  return dec.split('-').join(' ');

}


export default  function HomePage({filtro}:{filtro:string}) {
  const filter = convertTospace(filtro);

  const [products, setProduct] = useState< Productos[]>([]) ;
  const [lasVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);


  const lastCardRef = useRef(null);
 



  useEffect(()=>{
    // console.log("useEfec")
    const productos =async ()=> {
      const  { data, lastVisible  } = await baseClientLimitado(null, filter);
      setProduct(data);
      setLastVisible(lastVisible);
    }
    productos();      
  },[filter]);

 
  useEffect(() => {
    const productos =async ()=> {
      const {data, lastVisible} = await baseClientLimitado(lasVisible,filter);
      // console.log(data);
      if(data.length){
        setProduct(elem => [...(elem||[]), ...data]);
        setLastVisible(lastVisible);
      }
    }
    
    
    if (!lastCardRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        productos();
      }
    });

    observer.observe(lastCardRef.current);

    return () => observer.disconnect();
  }, [filter,products,lasVisible]);


  return (
    <>
      <main className={styles.main}>
      <Sidebar/>
        <header className={styles.head}>
          <h2 className={styles.titlePrincipal}>Tienda Mates</h2>
          <NavBar />
          
        </header>
        <h1 className={styles.title}>Nuestro catalogo</h1>

              
          <ul className={styles.productList}>
            {products?.map( (product, i) =>(
                
                <li key={product.id} ref={ i=== products.length-1? lastCardRef:null} >
                  <Card products={product}/>
                </li>              
            ))}
          </ul>

      </main>
    
    </>
  );
}
