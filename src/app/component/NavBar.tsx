import styles from "../../resources/styles/pageMain.module.css";



export default function NavBar() {

    return (
      <aside className={styles.aside}>
          <h2 className={styles.titleAside}>Tienda Mates</h2>
          
              <ul className={styles.elementAside}>
                  {/* <li><Link href="/" className="hover:text-white">Inicio</Link></li>
                  <li><Link href="#" className="hover:text-white">Contacto</Link></li>
                  <li><Link href="#" className="hover:text-white">Más vendidos</Link></li> */}
              </ul>
          
      </aside>
    )
  }