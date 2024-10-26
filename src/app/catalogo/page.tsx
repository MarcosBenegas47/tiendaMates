import { baseClient } from "@/lib/firebase/baseClient";
import HomePage from "./page.client";

export default async function Home() {
       const data = await baseClient() ;

   return <HomePage data={data }/>

}   