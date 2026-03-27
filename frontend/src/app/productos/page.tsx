
import { getCategory, getProduct } from "../service/getProduct"
import { Productos } from "./page.client"

export default async function Page() {
         const productos = await getProduct()
         const cats = await getCategory()

       return <Productos productos={productos} categorias={cats} />
   

}   