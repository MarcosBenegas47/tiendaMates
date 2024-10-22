"use client"
import styles from "../resources/styles/pageMain.module.css";
import { baseClient } from "@/lib/firebase/baseClient";
import Product from "./component/Product";
import NavBar from "./component/NavBar";
import { useEffect, useState } from "react";
import { Productos } from "@/Productos";





export default  function Home() {
 const [data, setData] = useState<Productos[]>([])
useEffect(()=>{

  const dataFucttion  = async ()=>{
    const data = await baseClient() ;
      setData(data);
  }

 dataFucttion()
},[])

  return (
    <>
    
      <main className={styles.main}>
        <header className={styles.head}>
          <h2 className={styles.titlePrincipal}>Tienda Mates</h2>
          <NavBar />
        </header>
        <h1 className={styles.title}>Nuestro catalogo</h1>

              
          <Product products={data}/>
      </main>
    
    </>
  );
}
