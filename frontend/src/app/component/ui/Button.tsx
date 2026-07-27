"use client"
import { cleanOffset } from "@/app/service/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ButtonBlackProps = {
  text: string,
  link:string
}
type ButtonWhiteProps = {
  text: string,
  link:string
}


export function ButtonBlackLink({link="", text}:ButtonBlackProps){
    return <Link href={link} className="bg-black pt-3 pb-3 pl-5 pr-5 !text-white border border-white rounded">{text}</Link>
}
export function ButtonWhiteLink({link="",text}:ButtonWhiteProps){
    const router = useRouter();

    const goToProducts = (ruta:string) =>{
        cleanOffset(ruta)
        router.push(ruta);  
    }
    

    return <button onClick={() => goToProducts(link)} className="bg-white w-full  text-center pt-3 pb-3 pl-5 pr-5 border border-black rounded">{text}</button>

}
export function ButtonBlack({text}:{text:string}){
    return <button  className="bg-black pt-3 pb-3 pl-5 pr-5 !text-white border border-white rounded">{text}</button>
}
export function ButtonWhite({text}:{text:string}){
    return <button  className="bg-white w-full  text-center pt-3 pb-3 pl-5 pr-5 border border-black rounded">{text}</button>

}