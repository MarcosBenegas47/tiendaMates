"use client"
import { login } from "@/app/service/adminUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    const router = useRouter()
    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(email, password);
    console.log(response)
    if(response.ok) router.push("/users/admin/dashboard")
  }

    return ( <>
    <section className=" bg-white flex justify-center ">
        <section className="w-full max-w-md border border-black/10 rounded flex flex-col p-9 gap-3.5">
            <h2 className="font-bold text-3xl">Iniciar sesión</h2>
            <form onSubmit={handleLogin} className="flex flex-col  gap-4">
                <div className="flex flex-col">
                    <label>Correo electronico</label>
                    <input 
                    className="p-3 bg-[#F7F7F7] " 
                    placeholder="correo@correo.com"
                            onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label>Contraseña</label>
                    <input className="p-3 bg-[#F7F7F7] "
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}

                     />
                </div>
                <div>
                    <button  className=" flex items-center gap-2 bg-black pt-3 pb-3 pl-5 pr-5 text-sm  !text-white border border-white rounded">  Ingresar</button>

                </div>
            </form>
        </section>
    </section>
    </>)
}