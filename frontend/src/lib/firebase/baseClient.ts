
// Import the functions you need from the SDKs you need
import { getFirestore, collection,query, getDocs, getDoc, doc, limit, startAfter, orderBy, DocumentSnapshot, where, getDocsFromServer, addDoc } from "@firebase/firestore"
import app from "./firebaseConfig"
import { Destacados, Productos } from "@/Productos";


const db = getFirestore(app);
const dbName:string =  process.env.NEXT_PUBLIC_BD_PROD || "";
export const baseClient = async ():Promise<Productos[]> =>{

    const query = await getDocs(collection(db,"productos"));
    const data:Productos[] = [];
    query.forEach(doc =>{
        data.push(doc.data() as Productos); 
    })
    return data as Productos[];
}

type ProductosResult = {
    data: Productos[];
    lastVisible: DocumentSnapshot | null;
  };
  

export const baseClientLimitado = async (lastDataPos:DocumentSnapshot |null, filter ="Todo"):Promise<ProductosResult > =>{
// console.log(filter);
    let productos = lastDataPos
    ? query( collection(db,dbName ), limit(6) ,where("estado","==",true), orderBy("id", "desc"),  startAfter(lastDataPos ))
    : query( collection(db,dbName ), limit(6), where("estado","==",true), orderBy("id", "desc"));
                                                            
    if(filter != "Todo"){
        productos = lastDataPos
        ? query( collection(db,dbName ),where("categoria","array-contains",filter) ,where("estado","==",true), orderBy("id"),  startAfter(lastDataPos ) ,limit(6) )
        : query( collection(db,dbName ),where("categoria","array-contains",filter), limit(6), orderBy("id"), where("estado","==",true));
        }
    const querysnap = await getDocsFromServer(productos );

    const data:Productos[] = [];
    querysnap.forEach(doc =>{
        data.push(doc.data() as Productos); 
    })
    const lastVisible = querysnap.docs.length > 0 ? querysnap.docs[querysnap.docs.length-1]: null;
    return  {data, lastVisible} ;
}

export const productById = async (id:number):Promise<Productos>=>{
    const query = await getDoc(doc(db, dbName, id.toString()));
    return query.data() as Productos;
}


export const dbDestacados = async ():Promise<Destacados[]> =>{
    const queryDest =  query(collection(db, "destacados"), orderBy("id", "desc"))
    const queryD = await getDocsFromServer(queryDest);

    const des:Destacados[] =[];
    queryD.forEach(element => {
        des.push(element.data() as Destacados)

    })
    return des;
}


export const agregarProducto = (productos:Productos )=>{
     addDoc(collection(db, dbName),productos)
}