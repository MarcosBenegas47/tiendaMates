"use server"

import { Category, Destacados, ProductosInter, ProductUpdate,  } from "@/Productos";
import { cookies } from "next/headers";

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
        console.log(JSON.stringify(payload))
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


export const createNewProduct = async (id:number | undefined, product:ProductUpdate)=>{
        const coolie = await cookies()
        const token = coolie.get("token")?.value
        const payload = JSON.parse(JSON.stringify(product));
        console.log(JSON.stringify(payload))
        try {
            const response = await fetch(`${url}/api/routes/admin/create/product`, {
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

