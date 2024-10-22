
// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs, getDoc, doc } from "@firebase/firestore"
import app from "./firebaseConfig"
import { Productos } from "@/Productos";
import { promises } from "dns";
const db = getFirestore(app);

export const  baseClient = async ():Promise<Productos[]> =>{

    const query = await getDocs(collection(db,"productos"));
    var data:Productos[] = [];
    query.forEach(doc =>{
        let datos = doc.data() as Productos
       console.log(`${datos.id}:${datos.codigo}`)
        data.push(doc.data() as Productos); 
    })
    return data
}
export const productById = async (id:number):Promise<Productos>=>{
    const query = await getDoc(doc(db, "productos", id.toString()))
    return query.data() as Productos;

}