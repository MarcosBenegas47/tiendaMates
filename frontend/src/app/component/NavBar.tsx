"use client"
import Link from "next/link"
import styles from "../../resources/styles/pageNav.module.css"
import { useState } from "react";
import { arrayCategory } from "../utility/categorias";
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
                  <li><Link href="/" className="hover:text-white"><i className="las la-home"></i> Inicio</Link></li>
                  <li>
                  <p onClick={() =>handleClick(isOpen)}  className="hover:text-white">Productos <i className="las la-angle-down"></i></p>
                    <ul className={`${styles.subMenu} ${isOpen ? styles.isOpen : ""}`}>
                      {arrayCategory.map((elem, i) => (
                        <Link key={i}  href={`/catalogo/${convertToSlug(elem) }`} > <li className={styles.elem} >{elem}</li></Link>
                      ))}
                    </ul>  
                                   
                  </li>


                  {/* <li><Link href="#" className="hover:text-white">Más vendidos</Link></li> */}
              </ul>
          
      </nav>
    )
  }