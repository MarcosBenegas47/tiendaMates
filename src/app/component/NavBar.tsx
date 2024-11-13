"use client"
import Link from "next/link"
import styles from "../../resources/styles/pageNav.module.css"
import { useState } from "react";
import { arrayCategory } from "../utility/categorias";
import Image from "next/image";
import inicio from "@/resources/assets/home-4-svgrepo-com.svg"
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
              <ul className={styles.elementNav}>
                  <li><Link href="/" className="hover:text-white"> Inicio</Link></li>
                  <li>
                  <p onClick={() =>handleClick(isOpen)}  className="hover:text-white">Productos +</p>
                    <ul className={`${styles.subMenu} ${isOpen ? styles.isOpen : ""}`}>
                      {arrayCategory.map((elem, i) => (
                        <li key={i} className={styles.elem}> <Link href={`/catalogo/${convertToSlug(elem) }`} >  {elem}</Link></li>
                      ))}
                    </ul>  
                                   
                  </li>


                  <li><Link href="#" className="hover:text-white">Más vendidos</Link></li>
              </ul>
          
      </nav>
    )
  }