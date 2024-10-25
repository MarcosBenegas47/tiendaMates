"use client"
import styles from "../resources/styles/pageMain.module.css";
import NavBar from "./component/NavBar";
import { Productos } from "@/Productos";
import Card from "./component/Card";





export default  function HomePage({data}:{data:Productos[]}) {
  return (
    <>
      <main className={styles.main}>
        <header className={styles.head}>
          <h2 className={styles.titlePrincipal}>Tienda Mates</h2>
          <NavBar />
        </header>
        <h1 className={styles.title}>Nuestro catalogo</h1>

              
          {/* <Product products={data}/> */}
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
