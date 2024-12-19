import jwt  from 'jsonwebtoken';
import clientApp from "@/lib/firebase/firebaseConfig-server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';
import { cookies } from 'next/headers';


const auth = getAuth(clientApp);
export async function POST(req:NextRequest ){

    try {
        
        const {email, password} = await req.json();
        const response = await signInWithEmailAndPassword(auth,email,password)

        const token =jwt.sign({
                uid:response.user.uid,
                email: response.user.email
            
        },"ClaveSecreta")
        const status =200;
   
        cookies().set("accessToken", token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:1000*60*60*24*30,
            path:'/'
        });

        NextResponse.json({status});
        console.log("login exitoso")
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 401, error: 'Unauthorized' });

    }

}