import Link from "next/link"
import styles from "../../resources/styles/pageNav.module.css"



export default function NavBar() {

    return (
      <nav className={styles.navBar}>
              <ul className={styles.elementNav}>
                  <li><Link href="/" className="hover:text-white">Inicio</Link></li>
                  <li><Link href="#" className="hover:text-white">Contacto</Link></li>
                  <li><Link href="#" className="hover:text-white">Más vendidos</Link></li>
              </ul>
          
      </nav>
    )
  }