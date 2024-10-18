
// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs } from "@firebase/firestore"
import app from "./firebaseConfig"
import { Productos } from "@/Productos";
import { promises } from "dns";

export const  baseClient = async ():Promise<Productos[]> =>{
    const db = getFirestore(app);

    const query = await getDocs(collection(db,"productos"));
    var data:Productos[] = [];
    query.forEach(doc =>{
        data.push(doc.data() as Productos); 
    })
    

    return data
}