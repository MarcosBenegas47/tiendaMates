import Link from "next/link";

type ButtonBlackProps = {
  text: string,
  link:string
}
type ButtonWhiteProps = {
  text: string,
  link:string
}



export function ButtonBlack({link="", text}:ButtonBlackProps){
    return <Link href={link} className="bg-black pt-3 pb-3 pl-5 pr-5 !text-white border border-white rounded">{text}</Link>
}
export function ButtonWhite({link="",text}:ButtonWhiteProps){
    return <Link href={link} className="bg-white pt-3 pb-3 pl-5 pr-5 border border-black rounded">{text}</Link>

}