"use client"
import styles from "../resources/styles/principal.module.css";
import { Destacados } from "@/Productos";

import Link from "next/link";
import { CardDest } from "./component/CardDestacados";

import Slider, { CustomArrowProps } from "react-slick";
import { arrayCategoriaPrincipal } from "./utility/categorias";
import Image from "next/image";

function SampleNextArrow(props:CustomArrowProps) {
  const { className, onClick } = props;
  return (
    <div onClick={onClick} className={styles.slickNext} ><i className="las la-angle-right"></i></div>
  );
}

function SamplePrevArrow(props:CustomArrowProps) {
  const { className, onClick } = props;
  return (
    <div className={styles.slickPrev} onClick={onClick}><i className="las la-angle-left"></i></div>
  );
}

export default  function HomePage({data}:{data:Destacados[]}) {
  
  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
     nextArrow: <SampleNextArrow />,
     prevArrow: <SamplePrevArrow />,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <section className={styles.main}>
        {/* <Sidebar/> */}
      {/* <NavBar/> */}
          <section className={styles.header}>
            
              <div className={styles.elementPrincipal}>
                <h2 className={styles.elementTitle}>Tienda Mates</h2>
                <h3 className={styles.elementDescription}>Descubre nuestra selección de mates y accesorios</h3>
                <Link href="/catalogo/Todo"> 
                <p className={styles.button}>Ir al catalogo</p>
                </Link>
              </div>
          </section>
          <section className={styles.productoDest}>
            <h3 className={styles.titleDest}> Productos destacados</h3>
            <ul className={styles.titleDest}>
              <Slider {...settings}>
              {data.map( elem =>(
                
          <li>
            <CardDest key={elem.id} destacados={elem}  />

        </li>
            ))}
            </Slider>
            </ul>
            
           

          </section>
          <section >
            <h3 className={styles.catTitle}>Categorias</h3>
            <section className={styles.catProd}>
              {arrayCategoriaPrincipal.map((elem, i) => (
                  <Link key={i} href={'/catalogo/'+elem.name} >
                    <div >
                      <div className={styles.catProdcont}>
                      <span className={styles.catProdText}>{elem.name} </span> 
                      </div>
                   

                  
                      <Image alt="imgCat" src={"/api/images/category/"+elem.id} unoptimized={true} width={200} height={200}/>
                    </div>
                   

                  </Link>

                
              ))}
            </section>
          </section>



      </section>
    
    </>
  );
}
