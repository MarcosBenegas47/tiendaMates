"use client"
import { login } from "@/app/service/adminUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


    const router = useRouter()
    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login(email, password);
      if (response.ok) router.push("/users/admin/dashboard");
      else setError("El correo electrónico o la contraseña son incorrectos.");
    } catch {
      setError("No se pudo iniciar sesión. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  }

    return ( <>
    <section className=" bg-white flex justify-center ">
        <section className="w-full max-w-md border border-black/10 rounded flex flex-col p-9 gap-3.5">
            <h2 className="font-bold text-3xl">Iniciar sesión</h2>
            <form onSubmit={handleLogin} className="flex flex-col  gap-4">
                <div className="flex flex-col">
                    <label>Correo electronico</label>
                    <input
                    type="email"
                    required
                    className="p-3 bg-[#F7F7F7] " 
                    placeholder="correo@correo.com"
                            onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label>Contraseña</label>
                    <input className="p-3 bg-[#F7F7F7] "
                    required
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}
                        type="password"
                     />
                </div>
                {error && <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div>
                    <button disabled={loading} className="flex items-center gap-2 bg-black px-5 py-3 text-sm !text-white border border-white rounded disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Ingresando…" : "Ingresar"}</button>

                </div>
            </form>
        </section>
    </section>
    </>)
}
