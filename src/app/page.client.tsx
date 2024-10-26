"use client"
import styles from "../resources/styles/principal.module.css";
import NavBar from "./component/NavBar";
import { Productos } from "@/Productos";
import Card from "./component/Card";
import Image from "next/image";

import img from "../resources/images/principal.webp"
import Link from "next/link";


export default  function HomePage({data}:{data:Productos[]}) {
  return (
    <>
      <main className={styles.main}>
        {/* <header className={styles.head}>
          <h2 className={styles.titlePrincipal}>Tienda Mates</h2>
          <NavBar />
        </header>
        <h1 className={styles.title}>Nuestro catalogo</h1>

              
          <ul className={styles.productList}>
            {data?.map( product =>(
               product.cantidad >0 &&(
              <Card key={product.id} products={product}/>)

            ))}
          </ul> */ }


          <header className={styles.header}>
              <div className={styles.elementPrincipal}>
                <h2 className={styles.elementTitle}>Tienda de mates</h2>
                <Link href="/catalogo"> 
                <p className={styles.button}>Ir al catalogo</p>
                </Link>
              </div>
          </header>
          <section className={styles.productoDest}>
            <h3 className={styles.titleDest}> Productos destacados</h3>
          </section>



      </main>
    
    </>
  );
}
