import React from "react";
import Link from "next/link";
import styles from "../../resources/styles/pageMain.module.css";
import imgMate from "../../resources/assets/mate-svgrepo-com.svg"
import Image from "next/image";



export default function Sidebar() {

  return (
    <aside className={styles.aside}>
      <section className={styles.titleSection}>
      <h2 className={styles.titleAside}>Tienda M<span className={styles.emoji}><Image  src={imgMate} alt="A" width={35}/></span>tes</h2>


      </section>
        <ul className={styles.elementAside}>
            <li><Link href="/" className="hover:text-white">Inicio</Link></li>
            {/* <li><Link href="#" className="hover:text-white">Catalogo</Link></li> */}
            
            <li><Link href="/catalogo" className="hover:text-white">Catalogo</Link></li>

            <li><Link href="#" className="hover:text-white">Contacto</Link></li>
        </ul>
        
    </aside>
  );
}