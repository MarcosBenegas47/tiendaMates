import firebase from "firebase/compat/app";
import app from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export const login = async (email:string, password:string) => {
    try {
        const response= await signInWithEmailAndPassword(auth, email,password);
        return response.user
        // console.log(response.user)
    
    } catch (error) {
        console.log(error)
    }
}
    