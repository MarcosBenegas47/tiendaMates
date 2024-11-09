"use client"
import React, { useState } from "react";
import Link from "next/link";
import styles from "../../resources/styles/pageMain.module.css";
import imgMate from "../../resources/assets/mate-svgrepo-com.svg"
import Image from "next/image";
import { arrayCategory } from "../utility/categorias";

const convertToSlug =(str:string)=>{
return str.split(' ').join('-');
}

export default function Sidebar() {
const [isOpen, setIsOpen] = useState<boolean>(false);


  const handleClick = (estado: boolean) => {
    setIsOpen(!estado);
}
  return (
    <aside className={styles.aside}>
      <section className={styles.titleSection}>
      <h2 className={styles.titleAside}>Tienda M<span className={styles.emoji}><Image  src={imgMate} unoptimized alt="A" width={35}/></span>tes</h2>


      </section>
        <ul className={styles.elementAside}>
            <li><Link href="/" className="hover:text-white">Inicio</Link></li>
            
            <li>
              {/* <Link href="/catalogo/completo" className={styles.catalogo} >Catalogo</Link> */}
             <p onClick={() => handleClick(isOpen)}>Catalogo</p>
              <ul className={`${styles.subMenu} ${isOpen ? styles.isOpen : ""}`} >
              
                {arrayCategory.map(elem =>(
                    <li ><Link href={`/catalogo/${convertToSlug(elem)}`}>{elem}</Link></li>
                ))}
                

              </ul>
            </li>

            <li ><Link href="#" className="hover:text-white">Contacto</Link></li>
        </ul>
        
    </aside>
  );
}




