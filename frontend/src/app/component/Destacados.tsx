import { getDestacados } from "../service/getProduct"
import { CardDest } from "./CardDest"

export async function  Destacados(){
    const destados = await getDestacados()
    return (<>
    {destados?.map(pro=>(
        <CardDest prod={pro} key={pro.id}/>
        
    ))}
    </>)
}