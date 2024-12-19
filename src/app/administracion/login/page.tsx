"use client";

import { loginAuth } from "@/app/service/getServiceList";
import { login } from "@/lib/firebase/baseUser";
import style from "@/resources/styles/login.module.css"
import { redirect } from "next/navigation";
import {  useState } from "react";

const Login =()=>{
    const [email, setEmail]= useState<string>("");
    const [password, setPassword] = useState<string>("");
    const enviar = ()=>{

        if(email != "" || password !=""){

            const response = loginAuth(email,password);
            

        }
    
    }
    
    return (
        <> 
            <section className={style.cardLogin}>
                <div className={style.elementLogin}>
                <h2>Igrese sus credenciales</h2>
                <section className={style.formulario}>
                    <div>
                        <label >Email</label>
                        <input type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="Ingrese el email" required/>
                    </div>
                    <div>

                        <label>Constraseña</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} name="password" placeholder="ingresar contraseña"/>
                    
                    </div>
                    <div>
                    <button onClick={enviar} className={style.buttonIngresar}>Ingresar</button>

                    </div>
                </section>
                </div>
                
            </section>
        </>

)
}
export default Login;
