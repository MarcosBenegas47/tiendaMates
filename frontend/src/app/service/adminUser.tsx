"use server"
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;


export const login = async (username:string, password:string) => {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);
    try {
        const response = await fetch(`${url}/api/routes/auth/login`, {
            method:"POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        })
        if (!response.ok) {
            throw new Error("Error en el login");
        }
        // const data = await response.json();
        // return data;
        const data = await response.json();
        const cookieStore = await cookies();
    // 🔥 guardar cookie segura
        cookieStore.set("token", data.access_token, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24, // 1 día
        });

        return { ok: true };

    } catch (error) {
        console.log("Login error:", error);
        return { ok: false };
    }
}


export const getCategorysAdmin = async () => {
    const coolie = await cookies()
    const token = coolie.get("token")?.value
    try {
        const response = await fetch(`${url}/api/routes/admin/product/categorys`, {
            method:"GET",
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

export const getCapacidadAdmin = async () => {
    const coolie = await cookies()
    const token = coolie.get("token")?.value
    try {
        const response = await fetch(`${url}/api/routes/admin/product/capacidad`, {
            method:"GET",
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

export const getEstiliosAdmin = async () => {
    const coolie = await cookies()
    const token = coolie.get("token")?.value
    try {
        const response = await fetch(`${url}/api/routes/admin/product/estilos`, {
            method:"GET",
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


export const getVirolaAdmin = async () => {
    const coolie = await cookies()
    const token = coolie.get("token")?.value
    try {
        const response = await fetch(`${url}/api/routes/admin/product/virola`, {
            method:"GET",
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

export const getMaterialAdmin = async () => {
    const coolie = await cookies()
    const token = coolie.get("token")?.value
    try {
        const response = await fetch(`${url}/api/routes/admin/product/material`, {
            method:"GET",
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


