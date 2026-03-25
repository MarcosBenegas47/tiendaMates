type ButtonBlackProps = {
  text: string;
}
type ButtonWhiteProps = {
  text: string;
}



export function ButtonBlack({text}:ButtonBlackProps){
    return <button className="bg-black pt-3 pb-3 pl-5 pr-5 text-white border border-white rounded">{text}</button>
}
export function ButtonWhite({text}:ButtonWhiteProps){
    return <button className="bg-white pt-3 pb-3 pl-5 pr-5 border border-black rounded">{text}</button>

}