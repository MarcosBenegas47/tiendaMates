"use client"
import styles from "../resources/styles/principal.module.css";
import { Destacados } from "@/Productos";

import Link from "next/link";
import { CardDest } from "./component/CardDestacados";

import Slider, { CustomArrowProps } from "react-slick";

function SampleNextArrow(props:CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
    className={`button button--text button--icon ${className}`}    
    style={{ display: "block", color:"black" ,opacity:1}} 
        onClick={onClick} 
    >
      <i style={{ display: "block", color:"black" ,opacity:1}}  className="las la-angle-right"></i>
    </div>
  );
}

function SamplePrevArrow(props:CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", background: "green",color: "black" }}
      onClick={onClick}
    />
  );
}

export default  function HomePage({data}:{data:Destacados[]}) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // nextArrow: <i className="las la-angle-right"></i>,
    // prevArrow: <i className="las la-angle-left"></i>,
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
          <section>
            <h3>Categorias</h3>
            
          </section>



      </section>
    
    </>
  );
}
