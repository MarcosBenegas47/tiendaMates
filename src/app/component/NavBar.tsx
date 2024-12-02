"use client"
import Link from "next/link"
import styles from "../../resources/styles/pageNav.module.css"
import { useState } from "react";
import { arrayCategory } from "../utility/categorias";
import Image from "next/image";
import imgMate from "../../resources/assets/mate-svgrepo-com.svg"

const convertToSlug =(str:string)=>{
  return str.split(' ').join('-');
  }

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (estado: boolean) => {
    setIsOpen(!estado);
  }
    return (
      <nav className={styles.navBar}>
        <section className={styles.titleSection}>
          <Link href="/">
          <h2 className={styles.titleAside}>Tienda M<span className={styles.emoji}><Image unoptimized={true} src={imgMate} alt="A" width={35}/></span>tes</h2>
          </Link>
        </section>
        <section className={styles.elementSection}>
        <ul className={styles.elementNav}>
                  <li><Link href="/" className="hover:text-white"><i className="las la-home"></i> Inicio</Link></li>
                  <li>
                  <p onClick={() =>handleClick(isOpen)}  className="hover:text-white">Productos <i className="las la-angle-down"></i></p>
                    <ul className={`${styles.subMenu} ${isOpen ? styles.isOpen : ""}`}>
                      {arrayCategory.map((elem, i) => (
                        <Link key={i} onClick={() =>handleClick(isOpen)} href={`/catalogo/${convertToSlug(elem) }`} > <li className={styles.elem} >{elem}</li></Link>
                      ))}
                    </ul>  
                                   
                  </li>


                  {/* <li><Link href="#" className="hover:text-white">Más vendidos</Link></li> */}
              </ul>
        </section>
        <section className={styles.buscarSection}>
          <p>Buscar</p>
        </section>
              
          
      </nav>
    )
  }