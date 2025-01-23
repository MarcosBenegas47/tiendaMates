"use client"
import Link from "next/link"
import styles from "../../resources/styles/pageNav.module.css"
import { useEffect, useRef, useState } from "react";
import { arrayCategory } from "../utility/categorias";
import Image from "next/image";
import imgMate from "../../resources/assets/mate-svgrepo-com.svg"
import { logoutAuth } from "../service/getServiceList";
import {  baseClientSearchTurso } from "@/lib/firebase/baseClient";
import { ProductosDB } from "@/Productos";

const convertToSlug =(str:string)=>{
  return str.split(' ').join('-');
  }

export default function NavBar({estado}:{estado:boolean}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listLi, setListLi] = useState<ProductosDB[]>([]);
  const sectionRef =useRef<HTMLDivElement>(null);
  const handleClick = (estado: boolean) => {
    setIsOpen(!estado);
  }
  const logout =( )=> {
    logoutAuth();
    // window.location.reload();
  }
    const formater = (str:string) =>{
      return str.replace
    }
    
    const search = async(e:React.ChangeEvent<HTMLInputElement>)=> {

      const str = e.target.value;
      console.log(str);
      if( str.length !== 0){      
        setListLi( await baseClientSearchTurso(str.trim()));
      }
      else{
        setListLi([]);
      }
    }

    useEffect( ()=> {
      const clickOutSide =( e:MouseEvent)=> {
        if(sectionRef.current && !sectionRef.current.contains(e.target as Node)){
          setListLi([]);
        }
      }
      document.addEventListener('mousedown' ,clickOutSide);
    },[])

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
                                   
                  </li>{estado &&(
                       <>
                      <li><Link href="/dashboard/admin" >Administracion</Link></li>  
                       <li><Link href="/" onClick={() => logout()}>Logout</Link></li> 
                       </>
                      )}

                  {/* <li><Link href="#" className="hover:text-white">Más vendidos</Link></li> */}
              </ul>
        </section>
        <section ref={sectionRef} className={styles.buscarSection}>
          <input className={styles.input} onChange={search}/>
          <ul  className={styles.dropdown} >
              {listLi.map((elem , i) => (
                <li key={i} className={styles.liProduct}>
                  <a href={`/producto/${elem.queryLink}`}>{elem.descripcion}</a>
                  </li> 
              ))}
          </ul>
        </section>
              
          
      </nav>
    )
  }