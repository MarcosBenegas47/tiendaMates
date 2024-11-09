import { baseClient } from "@/lib/firebase/baseClient";
import HomePage from "./page.client";

export default async function Home({params}: {params:{categoria:string}}) {
    const {categoria} = params;
    console.log(categoria);
    const data = await baseClient() ;

   return <HomePage data={data} filtro={categoria}/>

}   