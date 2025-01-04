
// Import the functions you need from the SDKs you need
import { 
    getFirestore, 
    collection,
    query, 
    getDocs,
    getDoc, 
    doc, 
    limit, 
    startAfter, 
    orderBy, 
    DocumentSnapshot, 
    where, 
    getDocsFromServer, 
    addDoc, 
    startAt, 
    endAt,
    setDoc} from "@firebase/firestore"
import app from "./firebaseConfig"
import { Destacados, Productos } from "@/Productos";


const db = getFirestore(app);
export const baseClient = async ():Promise<Productos[]> =>{

    const query = await getDocs(collection(db,"productosV2"));
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
    ? query( collection(db,"productosV2" ), limit(6) ,where("estado","==",true), orderBy("id"),  startAfter(lastDataPos ))
    : query( collection(db,"productosV2" ), limit(6), where("estado","==",true), orderBy("id"));
                                                            
    if(filter != "Todo"){
        productos = lastDataPos
        ? query( collection(db,"productosV2" ),where("categoria","array-contains",filter) ,where("estado","==",true), orderBy("id"),  startAfter(lastDataPos ) ,limit(6) )
        : query( collection(db,"productosV2" ),where("categoria","array-contains",filter), limit(6), orderBy("id"), where("estado","==",true));
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
    const query = await getDoc(doc(db, "productosV2", id.toString()));
    return query.data() as Productos;
}

export const productBySlug = async (slug:string):Promise<Productos>=>{
    const queryResult = query(collection(db,"productosV2"),orderBy('queryLink'),startAt(slug) ,endAt(slug+'\uf8ff'));
    const querys = await getDocsFromServer(queryResult);
    console.log(querys);

    return querys.docs[0].data()as Productos;
}


export const baseClientSearch = async (str:string):Promise<Productos[]> =>{
    
    
    const strFormat = str.toLowerCase();
    const data:Productos[]=[];
    const queryResult = query(collection(db,"productosV2"),orderBy('queryLink'),startAt(strFormat) ,endAt(strFormat+'\uf8ff'));
    const result = await getDocsFromServer(queryResult);
    
    result.forEach(doc => {
        
        data.push(doc.data() as Productos)
        
    })
    return data as Productos[];


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


export const agregarProducto = async (productos:Productos )=>{
    
console.log(productos);
    try {
        const queryDest =  query(collection(db, "productosV2"), orderBy("id","desc"), limit(1));
        const queryD = await getDocsFromServer(queryDest); 
        if(!queryD.empty){
            const id = queryD.docs[0].data().id +1;
            console.log(id);
            productos.id =id;
            console.log(productos);
             setDoc(doc(db,"productosV2",String(id)),productos);

        }   
    } catch (error) {
        console.log(error)
        
    }


}

