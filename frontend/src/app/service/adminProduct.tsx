"use server"

import { ProductCreate, ProductosInter, ProductUpdate} from "@/Productos";
import { cookies } from "next/headers";
import { buildQuery } from "./utils";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export const deleteProduct = async (id:number)=>{
        const coolie = await cookies()
        const token = coolie.get("token")?.value
        try {
            const response = await fetch(`${url}/api/routes/admin/product/delete/fisica/${id}`, {
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`,
    
                },
                
            })
            if (!response.ok) {
                throw new Error("Error en el fetch");
            }
    
            return response.json();
    
        } catch (error) {
            console.log("Login error:", error);
        }
}

export const updateProduct = async (id:number | undefined, product:ProductUpdate)=>{
        const coolie = await cookies()
        const token = coolie.get("token")?.value
        const payload = JSON.parse(JSON.stringify(product));
        try {
            const response = await fetch(`${url}/api/routes/admin/product/update/${id}`, {
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
    
                },
                body:  JSON.stringify(payload)

                
            })
            if (!response.ok) {
                throw new Error("Error en el fetch");
            }
    
            return response.json();
    
        } catch (error) {
            console.log("Login error:", error);
        }
}


export const createNewProduct = async ( product:ProductCreate, image:File | null, galery:File[])=>{
        const coolie = await cookies()
        const token = coolie.get("token")?.value
        const formData = new FormData();
        formData.append("product", JSON.stringify(product))
        if(image) formData.append("imgFirst", image)
        galery.forEach(file => {
            formData.append("galery", file)
        })


        try {
            const response = await fetch(`${url}/api/routes/admin/create/product`, {
                method:"POST",
                headers:{
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
    
                },
                body: formData

                
            })
            if (!response.ok) {
                console.log("Status:", response.status);

                const error = await response.text();
                console.log("Error FastAPI:", error);

                throw new Error(error);
            }
            return response.json();
    
        } catch (error) {
            console.log("Login error:", error);
        }
}


export const getProductAdmin = async (id:number[] | []=[] , offset:number = 0):Promise<ProductosInter[] | null> =>{

    try {
        const response = await fetch(`${url}/api/routes/admin/categorys/products${buildQuery(id, offset)}`);
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
