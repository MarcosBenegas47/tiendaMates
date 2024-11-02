"use client"
import styles from "../resources/styles/pageMain.module.css";
import NavBar from "./component/NavBar";
import { Productos } from "@/Productos";
import Card from "./component/Card";
import Image from "next/image";
import imgMate from "../resources/assets/mate-svgrepo-com.svg"





export default  function HomePage({data}:{data:Productos[]}) {
  return (
    <>
      <main className={styles.main}>
        <header className={styles.head}>
          <h2 className={styles.titlePrincipal}>Tienda M<span className={styles.emoji}><Image unoptimized={true} src={imgMate} alt="A" width={25}/></span>tes</h2>
          <NavBar />
        </header>
        <h1 className={styles.title}>Nuestro catalogo</h1>

              
          <ul className={styles.productList}>
            {data?.map( product =>(
               product.cantidad >0 &&(
              <Card key={product.id} products={product}/>)

            ))}
          </ul>

      </main>
    
    </>
  );
}
