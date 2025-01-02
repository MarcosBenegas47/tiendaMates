"use Client"
import styles from "@/resources/styles/dashboard.module.css";

import { Productos } from "@/Productos";
import Image from "next/image";
import Link from "next/link";

const DashboardClient = ({data}:{data:Productos[]})=>{
    
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
                {data.map(elem => (
                    <tr key={elem.id} className={styles.tbody}>
                        <td>
                            {elem.id}
                        </td>
                        <td>{elem.codigo}</td>
                        
                        <td>
                            {elem.descripcion}
                        </td>
                        <td>
                            {elem.p_Unitario_final}
                        </td>
                        <td>{elem.cantidad}</td>
                        <td>{elem.categoria}</td>
                        
                        <td>
                            <Image src={`/api/images/${elem.codigo}`} alt="imagen" width={50} unoptimized={true} height={50} />
                        </td>
                        <td>
                                <button className={styles.actionButton}>Editar</button>
                                <button className={styles.actionButton}>Eliminar</button>
                        </td>
                        
                    
                    </tr>
                ))}
                </tbody>
                
            </table>
            
    
        </section></main>
    )
}
export default DashboardClient;

    
