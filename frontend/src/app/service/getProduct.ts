import { Destacados } from "@/Productos";

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

