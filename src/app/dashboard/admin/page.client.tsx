"use client"
import styles from "@/resources/styles/dashboard.module.css";

import { Productos, ProductosDBconCat } from "@/Productos";
import Image from "next/image";
import Link from "next/link";



const DashboardClient = ({data}:{data:ProductosDBconCat[]})=>{
    const deleteProduct =  async (producto:Productos)=> {
        try {
            console.log(producto);
        
             deleteProduct(producto);
        } catch (error) {
            console.log(error)
        }
        
        
    }
    
    return(<main className={styles.main}>
        
        <section className={styles.section}> 
            <div className={styles.title}>
                <h2>Productos</h2>
                <Link className={styles.agregr} href={'/dashboard/crear'}>+ Agregar producto</Link>
            </div>

            

            <input placeholder="Buscar..."/></section>
        <section >

            <table className={styles.table}>
                <thead >
                <tr className={styles.thead}>
                    <th >
                        Id
                    </th>
                    <th>Codigo</th>
                    
                    <th>
                        Descripcion
                    </th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Categoria</th>
                    
                    <th>
                        imagen        
                    </th>
                    <th >Accion</th>
                </tr>
                </thead>
                <tbody>
                {data.map((elem,i) => (
                    
                    <tr key={i} className={styles.tbody}>
                        <td>
                            {elem.id_mate}
                        </td>
                        <td>{elem.codigo}</td>
                        
                        <td>
                            {elem.descripcion}
                        </td>
                        <td>
                            {elem.precio}
                        </td>
                        <td>{elem.cantidad}</td>
                        <td>{elem.categorias.map(elem => ( <p>{elem +", "}</p> ))}</td>
                        
                        <td>
                            <Image src={`/api/images/${elem.codigo}`} alt="imagen" width={50} unoptimized={true} height={50} />
                        </td>
                        <td>
                            <Link href={`/dashboard/editar/${elem.queryLink}`} className={styles.actionButton}>Editar</Link>
                            <button onClick={() => deleteProduct(elem)} className={styles.actionButton}>Eliminar</button>
                        </td>
                        
                    
                    </tr>
                ))}
                </tbody>
                
            </table>
            
    
        </section></main>
    )
}
export default DashboardClient;

    
