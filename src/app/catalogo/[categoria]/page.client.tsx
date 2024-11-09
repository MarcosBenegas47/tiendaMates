"use client"
import styles from "@/resources/styles/pageMain.module.css";
import NavBar from "../../component/NavBar";
import { Productos } from "@/Productos";
import Card from "../../component/Card";

const convertTospace =  (str:string ) =>{
  return str.split('-').join(' ');
}


export default  function HomePage({data, filtro}:{data:Productos[],filtro:string}) {
  const filter = convertTospace(filtro)
const productos = data.filter(elem => {
  console.log(filter);
  console.log( elem.categoria);
 return elem.categoria.includes(filter);
})

console.log(data);
console.log(productos);

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
            {productos?.map( product =>(
               product.cantidad >0 &&(
              <Card key={product.id} products={product}/>)

            ))}
          </ul>

      </main>
    
    </>
  );
}
