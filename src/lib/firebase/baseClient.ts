
// Import the functions you need from the SDKs you need
import { getFirestore, collection,query, getDocs, getDoc, doc, limit, startAfter, orderBy, DocumentSnapshot, where, getDocsFromServer, addDoc } from "@firebase/firestore"
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

type ProductosResult = {
    data: Productos[];
    lastVisible: DocumentSnapshot | null;
  };
  

export const baseClientLimitado = async (lastDataPos:DocumentSnapshot |null, filter ="Todo"):Promise<ProductosResult > =>{
// console.log(filter);
    let productos = lastDataPos
    ? query( collection(db,"productos" ), limit(6) ,where("cantidad","!=",0), orderBy("id"),  startAfter(lastDataPos ))
    : query( collection(db,"productos" ), limit(6), where("cantidad","!=",0), orderBy("id"));
                                                            
    if(filter != "Todo"){
        productos = lastDataPos
        ? query( collection(db,"productos" ),where("categoria","array-contains",filter) ,where("cantidad",">",0), orderBy("id"),  startAfter(lastDataPos ) ,limit(6) )
        : query( collection(db,"productos" ),where("categoria","array-contains",filter), limit(6), orderBy("id"), where("cantidad",">",0));
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
    const query = await getDoc(doc(db, "productos", id.toString()));
    return query.data() as Productos;
}


export const dbDestacados = async ():Promise<Destacados[]> =>{
    const queryDest =  query(collection(db, "destacados"), orderBy("id"))
    const queryD = await getDocsFromServer(queryDest);

    const des:Destacados[] =[];
    queryD.forEach(element => {
        des.push(element.data() as Destacados)

    })
    return des;
}


export const agregarProducto = (productos:Productos )=>{
     addDoc(collection(db, "productos"),productos)
}

