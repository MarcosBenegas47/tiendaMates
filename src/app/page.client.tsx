"use client"
import styles from "../resources/styles/principal.module.css";
import { Destacados, Productos } from "@/Productos";

import Link from "next/link";
import NavBar from "./component/NavBar";
import dynamic from "next/dynamic";
import { CardDest } from "./component/CardDestacados";

export default  function HomePage({data}:{data:Destacados[]}) {
  return (
    <>
      <main className={styles.main}>
      <NavBar/>
          <header className={styles.header}>
            
              <div className={styles.elementPrincipal}>
                <h2 className={styles.elementTitle}>Tienda mates</h2>
                <h3 className={styles.elementDescription}>Descubre nuestra selección de mates y accesorios</h3>
                <Link href="/catalogo"> 
                <p className={styles.button}>Ir al catalogo</p>
                </Link>
              </div>
          </header>
          <section className={styles.productoDest}>
            <h3 className={styles.titleDest}> Productos destacados</h3>
            <ul className={styles.destCards}>
            {data.map( elem =>(
              <CardDest key={elem.id} destacados={elem}  />
            ))}
            </ul>
           

          </section>



      </main>
    
    </>
  );
}
