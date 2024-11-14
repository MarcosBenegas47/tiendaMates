import { baseClient, dbDestacados } from "@/lib/firebase/baseClient";
import HomePage from "./page.client";

export default async function Home() {
   const destacados = await dbDestacados();

       
   return <HomePage data={destacados }/>

}   