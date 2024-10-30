
// Import the functions you need from the SDKs you need
import { getFirestore, collection, getDocs, getDoc, doc } from "@firebase/firestore"
import app from "./firebaseConfig"
import { Destacados, Productos } from "@/Productos";
const db = getFirestore(app);

export const baseClient = async ():Promise<Productos[]> =>{

    const query = await getDocs(collection(db,"productos"));
    const data:Productos[] = [];
    query.forEach(doc =>{
        data.push(doc.data() as Productos); 
    })
    return data as Productos[];
}
export const productById = async (id:number):Promise<Productos>=>{
    const query = await getDoc(doc(db, "productos", id.toString()));
    return query.data() as Productos;

}


export const dbDestacados = async ():Promise<Destacados[]> =>{
    const query = await getDocs(collection(db, "destacados"));

    const des:Destacados[] =[];
    query.forEach(element => {
        des.push(element.data() as Destacados)

    })
    return des
}