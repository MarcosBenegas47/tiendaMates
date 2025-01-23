
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
    startAt, 
    endAt,
    setDoc,
    deleteDoc} from "@firebase/firestore"
import app from "./firebaseConfig"
import { Destacados, Productos, ProductosDB, ProductosDBconCat } from "@/Productos";
import client from "./clientTurso";




const db = getFirestore(app);
export const baseClient = async ():Promise<Productos[]> =>{

    const query = await getDocs(collection(db,"productosV2"));
    const data:Productos[] = [];
    query.forEach(doc =>{
        data.push(doc.data() as Productos); 
    })
    return data as Productos[];
}
export const baseClientTurso = async ():Promise<ProductosDBconCat[]> =>{

    let producto = (await client.execute(`SELECT
            id_mate,
            codigo,
            cantidad, 
            descripcion, 
            estado, 
            eliminado,
            precio,
            nombre_Link,
            GROUP_CONCAT(c.categoria) AS categorias
             FROM productos p LEFT JOIN producto_categoria pc ON p.id_mate = pc.id_producto LEFT JOIN categorias c ON pc.id_categoria = c.id_categoria LEFT JOIN nombreLink n ON p.id_mate = n.id_producto
               GROUP BY p.id_mate`)).rows ;

    const data: ProductosDBconCat[] =[]
  
        producto.forEach((elem) =>  {
            data.push({
            id_mate: Number(elem.id_mate) || 0,
            codigo: elem.codigo? elem.codigo.toString(): "" ,
            cantidad: Number(elem.cantidad)||0 , 
            descripcion:elem.descripcion? elem.descripcion.toString(): "", 
            estado:elem.estado == 1? true:false|| true, 
            eliminado:elem.eliminado == 1? true:false || true, 
            precio: elem.precio? elem.precio.toString(): "",
            queryLink: elem.nombre_Link? elem.nombre_Link.toString(): "",
            categorias:elem.categorias? elem.categorias.toString().split(','): [], 

        })

        } )
        console.log(data)

   
    return data;
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


export const baseClientLimitadoTurso = async (lastDataPos =0 , filter ="Todo") =>{
    // console.log(filter);
        let producto
        if(filter != "Todo"){
         
                console.log(lastDataPos)
                 producto = (await client.execute(`SELECT
                id_mate,
                codigo,
                cantidad, 
                descripcion, 
                estado, 
                eliminado,
                precio,
                nombre_Link
                 FROM productos 
                  LEFT JOIN nombreLink ON id_mate = id_producto
                   WHERE id_mate IN (SELECT id_producto FROM producto_categoria pc LEFT JOIN categorias c ON pc.id_categoria = c.id_categoria WHERE categoria = '${filter}' )
                    AND estado = '1'  ORDER BY id_mate DESC LIMIT ${lastDataPos}, 6 `)).rows ;

        }else{
             producto = (await client.execute(`SELECT id_mate, codigo, cantidad, descripcion, estado, eliminado, precio, nombre_Link FROM productos LEFT JOIN nombreLink ON  id_mate = id_producto WHERE estado = '1' ORDER BY id_mate DESC LIMIT ${lastDataPos}, 6`)).rows ;

        }
        const dataT: ProductosDB[] =[]
      
            producto.forEach((elem) =>  {
                dataT.push({
                id_mate: Number(elem.id_mate) || 0,
                codigo: elem.codigo? elem.codigo.toString(): "" ,
                cantidad: Number(elem.cantidad)||0 , 
                descripcion:elem.descripcion? elem.descripcion.toString(): "", 
                estado:elem.estado == 1? true:false|| true, 
                eliminado:elem.eliminado == 1? true:false || true, 
                precio: elem.precio? elem.precio.toString(): "",
                queryLink: elem.nombre_Link? elem.nombre_Link.toString(): ""
            })
    
            } )

        // console.log(dataT)
        
        const lastVisibleT= dataT.length !== 0 ? lastDataPos + dataT.length  : 0;

         return {dataT , lastVisibleT} ;
}

export const productBySlug = async (slug:string):Promise<Productos>=>{


    const queryResult = query(collection(db,"productosV2"),orderBy('queryLink'),startAt(slug) ,endAt(slug+'\uf8ff'));
    const querys = await getDocsFromServer(queryResult);

    return querys.docs[0].data()as Productos;
}





export const productBySlugTurso = async (slug:string):Promise<ProductosDB>=>{
    console.log(slug)
    let query = (await client.execute(`SELECT
            id_mate,
            codigo,
            cantidad, 
            descripcion, 
            estado, 
            eliminado,
            precio,
            nombre_Link
            FROM productos LEFT JOIN nombreLink ON id_mate = id_producto WHERE nombre_Link = '${slug}' `)).rows ;

            const prod:ProductosDB = {
                id_mate: Number(query[0].id_mate) || 0,
                codigo: query[0].codigo? query[0].codigo.toString(): "" ,
                cantidad: Number(query[0].cantidad)||0 , 
                descripcion:query[0].descripcion? query[0].descripcion.toString(): "", 
                estado:query[0].estado == 1? true:false|| true, 
                eliminado:query[0].eliminado == 1? true:false || true, 
                precio: query[0].precio? query[0].precio.toString(): "",
                queryLink: query[0].nombre_Link? query[0].nombre_Link.toString(): ""
            }
console.log(prod)

     return prod as ProductosDB;
}
export const productById = async (id:number):Promise<Productos>=>{
    const query = await getDoc(doc(db, "productosV2", id.toString()));
    return query.data() as Productos;
}
export const productByIdTurso  = async (id:number):Promise<ProductosDB>=>{
    let query = (await client.execute(`SELECT
        id_mate,
        codigo,
        cantidad, 
        descripcion, 
        estado, 
        eliminado,
        precio,
        nombre_Link
        FROM productos LEFT JOIN nombreLink ON id_mate = id_producto WHERE id_mate = '${id}' `)).rows ;
    console.log(query)

    const prod:ProductosDB = {
        id_mate: Number(query[0].id_mate) || 0,
        codigo: query[0].codigo? query[0].codigo.toString(): "" ,
        cantidad: Number(query[0].cantidad)||0 , 
        descripcion:query[0].descripcion? query[0].descripcion.toString(): "", 
        estado:query[0].estado == 1? true:false|| true, 
        eliminado:query[0].eliminado == 1? true:false || true, 
        precio: query[0].precio? query[0].precio.toString(): "",
        queryLink: query[0].nombre_Link? query[0].nombre_Link.toString(): ""
    }


    return prod as ProductosDB;
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

export const baseClientSearchTurso = async (str:string):Promise<ProductosDB[]> =>{
    
    
    const strFormat = str.toLowerCase();
    const data:ProductosDB[]=[];
    let query = (await client.execute(`SELECT
        id_mate,
        codigo,
        cantidad, 
        descripcion, 
        estado, 
        eliminado,
        precio,
        nombre_Link
        FROM productos LEFT JOIN nombreLink ON id_mate = id_producto WHERE nombre_Link LIKE '%${str}%' `)).rows ;
        console.log(query)
        
        query.forEach(doc => {
            data.push({
            id_mate: Number(doc.id_mate) || 0,
            codigo: doc.codigo? doc.codigo.toString(): "" ,
            cantidad: Number(doc.cantidad)||0 , 
            descripcion:doc.descripcion? doc.descripcion.toString(): "", 
            estado:doc.estado == 1? true:false|| true, 
            eliminado:doc.eliminado == 1? true:false || true, 
            precio: doc.precio? doc.precio.toString(): "",
            queryLink: doc.nombre_Link? doc.nombre_Link.toString(): ""
        })

    
    
        
        
    })
    return data as ProductosDB[];


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

export const dbDestacadosTurso = async ():Promise<Destacados[]> =>{
    let query = (await client.execute(`SELECT
        id_prodDest,
        codigo,
        descripcion
        FROM destacados LEFT JOIN productos ON id_prodDest = id_mate  `)).rows ;

    const des:Destacados[] =[];
    query.forEach(element => {
        des.push({
            id: Number(element.id_prodDest) || 0,
            codigo: element.codigo? element.codigo.toString(): "" ,
            descripcion:element.descripcion? element.descripcion.toString(): "", 
        })

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

            return true;
        }

    } catch (error) {
        console.log(error)
        return false;
    }
}
export const editProduct = async ( id:number,producto:Productos)=>{
    producto.id = id
    try {
        await setDoc(doc(db,"productosV2",String(id)),producto );

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const agregarProductoTurso = async (productos:Productos )=>{
    
console.log(productos);


    try {
        let query = await client.execute(`INSERT INTO productos (codigo , cantidad, descripcion, estado, eliminado, precio)
            VALUES (${productos.codigo}, ${productos.cantidad}, ${productos.descripcion},${productos.estado} ,0,${productos.p_Unitario_final})`) ;
            console.log( query)

            const id = await client.execute(`SELECT last_insert_rowid()  as id_mate`)
  
            return true;
        

    } catch (error) {
        console.log(error)
        return false;
    }
}
export const editProductTurso = async ( id:number,producto:Productos)=>{
    producto.id = id
    try {
        await setDoc(doc(db,"productosV2",String(id)),producto );

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


