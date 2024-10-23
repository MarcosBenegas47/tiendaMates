import React from "react";
import Link from "next/link";
import styles from "../../resources/styles/pageMain.module.css";
import imgMate from "../../resources/assets/mate-svgrepo-com.svg"
import Image from "next/image";



export default function Sidebar() {

  return (
    <aside className={styles.aside}>
        <h2 className={styles.titleAside}>Tienda M<span><Image src={imgMate} alt="A" width={35}/></span>tes</h2>
        
            <ul className={styles.elementAside}>
                <li><Link href="/" className="hover:text-white">Inicio</Link></li>
                <li><Link href="#" className="hover:text-white">Contacto</Link></li>
                <li><Link href="#" className="hover:text-white">Más vendidos</Link></li>
            </ul>
        
    </aside>
  );
}