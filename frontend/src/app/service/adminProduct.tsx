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

export const updateProductFull = async (
    id: number,
    product: ProductUpdate,
    image: File | null,
    gallery: File[],
    retainedGallery: string[],
    removeMainImage: boolean,
): Promise<{ ok: boolean; error?: string }> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return { ok: false, error: "La sesión expiró. Volvé a iniciar sesión." }

    const formData = new FormData()
    formData.append("product", JSON.stringify(product))
    formData.append("keepGallery", JSON.stringify(retainedGallery))
    formData.append("removeMainImage", String(removeMainImage))
    if (image) formData.append("imgFirst", image)
    gallery.forEach((file) => formData.append("galery", file))

    try {
        const response = await fetch(`${url}/api/routes/admin/product/update/full/${id}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })
        if (!response.ok) {
            const detail = await response.text()
            console.error("Error del backend al actualizar producto", response.status, detail)
            return { ok: false, error: `El servidor rechazó los cambios (${response.status}). ${detail}` }
        }
        return { ok: true }
    } catch (error) {
        console.error("Error actualizando producto", error)
        return { ok: false, error: "No se pudo conectar con el servidor." }
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
                    Authorization: `Bearer ${token}`,
    
                },
                body: formData

                
            })
            if (!response.ok) {
                console.log("Status:", response.status);

                const error = await response.text();
                console.log("Error FastAPI:", error);
                return false

            }
            
            return true;
    
        } catch (error) {
            console.log("Login error:", error);
            return false
        }
}


export const getProductAdmin = async (id:number[] | []=[] , offset:number = 0):Promise<ProductosInter[] | null> =>{
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) return null;

    try {
        const response = await fetch(`${url}/api/routes/admin/categorys/products${buildQuery(id, offset)}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
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
