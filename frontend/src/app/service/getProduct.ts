import { Category, Destacados, ProductosInter,  } from "@/Productos";
import { promises } from "dns";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getDestacados = async ():Promise<Destacados[] | null> =>{
    try {
        const response = await fetch(`${url}/api/routes/store/destacados`);
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const resultado:Destacados[] = await response.json()
        return resultado
    } catch (error) {
        console.log("Fetch error Destacados", error)
        return null
        
    }

}

const buildQuery =(id:number[] | []=[] , offset:number = 0) => {
    const params: string[] = []
    if(id && id.length >0){
        params.push(`id=[${id.join(",")}]`)
    }
    if(offset != undefined && offset !=0){
        params.push(`offset=${offset}`)
    }
    return params.length?  `?${params.join("&")}`:""
}

export const getProduct = async (id:number[] | []=[] , offset:number = 0):Promise<ProductosInter[] | null> =>{

    console.log()
    try {
        const response = await fetch(`${url}/api/routes/store/categorys/products${buildQuery(id, offset)}`);
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const resultado:ProductosInter[] = await response.json()
        return resultado
    } catch (error) {
        console.log("Fetch error Destacados", error)
        return null
        
    }

}

export const getCategory = async ():Promise<Category[] | null> =>{
    try {
        const response = await fetch(`${url}/api/routes/store/categorys`);
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const resultado:Category[] = await response.json()
        return resultado
    } catch (error) {
        console.log("Fetch error Destacados", error)
        return null
        
    }

}


export const getProductBySearch = async (queryLink:string):Promise<ProductosInter[] | null> =>{
    try {
        const response = await fetch(`${url}/api/routes/store/search/${queryLink}`);
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const resultado:ProductosInter[] = await response.json()
        return resultado
    } catch (error) {
        console.log("Fetch error Destacados", error)
        return null
        
    }

}
export const getProductBySlug = async(slug:string):Promise<ProductosInter | null> => {
    try {
        const response = await fetch(`${url}/api/routes/store/product/${slug}`);
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const resultado:ProductosInter = await response.json()
        return resultado
    } catch (error) {
        console.log("Fetch error Destacados", error)
        return null
        
    }
} 



