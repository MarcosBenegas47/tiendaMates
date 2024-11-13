import { baseClient, baseClientLimitado } from "@/lib/firebase/baseClient";
import HomePage from "./page.client";

export default async function Home({params}: {params:{categoria:string}}) {
    const {categoria} = params;


//    const data = await baseClient() ;
   
  
   return <HomePage filtro={categoria}/>

}   



