import { dbDestacados, dbDestacadosTurso } from "@/lib/firebase/baseClient";
import HomePage from "./page.client";

export default async function Home() {
   //const destacados = await dbDestacados();
   const destacadosT = await dbDestacadosTurso();
   return <HomePage data={destacadosT }/>

}   