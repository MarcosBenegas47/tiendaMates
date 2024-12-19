"use server"
import jwt  from 'jsonwebtoken';
import firebase from "firebase/compat/app";
import app from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from 'next/headers';

const auth = getAuth(app);

export const login = async (email:string, password:string) => {

    
    try {
        const response= await signInWithEmailAndPassword(auth, email,password);
        // const token = sing(
        //     {email,username},""
        // )
        if(response){
            console.log("correcto")
            const user =response.user;
            const token = jwt.sign({
                uid:user.uid,
                email: user.email
                
            },"secret")
            
            console.log(token)
        }
        console.log(response)
        // return response.user
        
    } catch (error) {
        console.log(error)
    }
}
    