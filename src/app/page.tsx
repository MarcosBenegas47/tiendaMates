
import styles from "../resources/styles/pageMain.module.css";
import { baseClient } from "@/lib/firebase/baseClient";
import Product from "./component/Product";





export default async function Home() {

  const data = await baseClient();
  return (
    <>
    
      <main className={styles.main}>
        <Product products={data}/>
      </main>
    
    </>
  );
}
