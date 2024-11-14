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
            <li><Link href="/" className="hover:text-white"><i className="las la-home"></i> Inicio</Link></li>
            
            <li >
             <p onClick={() => handleClick(isOpen)}>Catalogo <i className="las la-angle-down"></i></p>
              <ul className={`${styles.subMenu} ${isOpen ? styles.isOpen : ""}`} >
              
                {arrayCategory.map((elem, i) =>(
                    <li key={i} className={styles.elem}><Link href={`/catalogo/${convertToSlug(elem)}`}>{elem}</Link></li>
                ))}
                

              </ul>
            </li>

            {/* <li ><Link href="#" className="hover:text-white">Contacto</Link></li> */}
        </ul>
        
    </aside>
  );
}




