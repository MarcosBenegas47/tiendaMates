
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
    } from "@firebase/firestore"
import app from "./firebaseConfig"
import { Category, Destacados, Productos, ProductosDB, ProductosDBconCat, ProductosDBconCatnum } from "@/Productos";
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
            GROUP_CONCAT(c.categoria) AS categorias,
            GROUP_CONCAT(c.id_categoria) AS id_categorias
            FROM productos p LEFT JOIN producto_categoria pc ON p.id_mate = pc.id_producto LEFT JOIN categorias c ON pc.id_categoria = c.id_categoria LEFT JOIN nombreLink n ON p.id_mate = n.id_producto
              WHERE eliminado = 0 GROUP BY p.id_mate `)).rows ;

    const data: ProductosDBconCat[] =[]
  
    producto.forEach((elem) =>  {
        const id_categorias = elem.id_categorias ? elem.id_categorias.toString().split(',').map(Number): [];
        const categorias = elem.categorias ? elem.categorias.toString().split(','): [];

        data.push({
        id_mate: Number(elem.id_mate) || 0,
        codigo: elem.codigo? elem.codigo.toString(): "" ,
        cantidad: Number(elem.cantidad)||0 , 
        descripcion:elem.descripcion? elem.descripcion.toString(): "", 
        estado:elem.estado == 1? true:false|| true, 
        eliminado:elem.eliminado == 1? true:false || true, 
        precio: elem.precio? elem.precio.toString(): "",
        queryLink: elem.nombre_Link? elem.nombre_Link.toString(): "",
        categorias:categorias.map((categoria, index) => ({
            id_categoria: id_categorias[index],
            categoria: categoria
          })), 

    })

    } );
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
                    AND estado = '1' AND eliminado = 0  ORDER BY id_mate DESC LIMIT ${lastDataPos}, 6 `)).rows ;

        }else{
             producto = (await client.execute(`SELECT id_mate,
                 codigo, 
                 cantidad,
                  descripcion,
                   estado,
                    eliminado,
                     precio,
                      nombre_Link
                       FROM productos 
                       LEFT JOIN nombreLink ON  id_mate = id_producto 
                       WHERE estado = '1' AND eliminado = 0 ORDER BY id_mate DESC LIMIT ${lastDataPos}, 6`)).rows ;

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
            p.id_mate,
            p.codigo,
            p.cantidad, 
            p.descripcion, 
            p.estado, 
            p.eliminado,
            p.precio,
            nl.nombre_Link,
            GROUP_CONCAT(c.id_categoria) AS id_categorias,
            GROUP_CONCAT(c.categoria) AS categorias
            FROM productos p 
            LEFT JOIN nombreLink nl ON p.id_mate = nl.id_producto

            LEFT JOIN producto_categoria pc ON p.id_mate = pc.id_producto
            LEFT JOIN categorias c ON pc.id_categoria = c.id_categoria

            WHERE nombre_Link = '${slug}' `)).rows ;
            console.log(query)
            const categorias = query[0].categorias ? query[0].categorias.toString().split(',') : [];
            const id_categorias = query[0].id_categorias ? query[0].id_categorias.toString().split(',').map(Number) : [];

            const prod:ProductosDBconCat = {
                id_mate: Number(query[0].id_mate) || 0,
                codigo: query[0].codigo? query[0].codigo.toString(): "" ,
                cantidad: Number(query[0].cantidad)||0 , 
                descripcion:query[0].descripcion? query[0].descripcion.toString(): "", 
                estado:query[0].estado == 1? true:false|| true, 
                eliminado:query[0].eliminado == 1? true:false || true, 
                precio: query[0].precio? query[0].precio.toString(): "",
                queryLink: query[0].nombre_Link? query[0].nombre_Link.toString(): "",
                categorias:categorias.map((categoria, index) => ({
                    id_categoria: id_categorias[index],
                    categoria: categoria
                  })), 
            }
console.log(prod)
     return prod as ProductosDBconCat;
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
export const categoryProductTurso = async ():Promise<Category[]> => {
    const query = (await client.execute(`SELECT * FROM categorias`)).rows;
    console.log(query)
    const cat:Category[] =[];
    query.forEach(elem => {
        cat.push({
            id_categoria: Number(elem.id_categoria) || 0,
            categoria: elem.categoria? elem.categoria.toString(): "" ,
        })
    });
    return cat as Category[];
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

export const agregarProductoTurso = async (productos:ProductosDBconCatnum )=>{
    
console.log(productos);


    try {
        let query = await client.execute(`INSERT INTO productos (codigo , cantidad, descripcion, estado, eliminado, precio)
            VALUES ('${productos.codigo}', ${productos.cantidad}, '${productos.descripcion}', ${productos.estado} ,0 , '${productos.precio}')`) ;
            console.log( query)

            const id = await client.execute(`SELECT MAX(id_mate) as id_mate FROM productos`);
            console.log(id)
            const id_new_mate = id.rows[0].id_mate
            console.log(id_new_mate)
           
            await client.execute(`INSERT INTO nombrelink (id_producto, nombre_Link)
            VALUES (${id_new_mate}, '${productos.queryLink}')`)
           
            productos.categorias.forEach( async (elem)  => {
                await client.execute(`INSERT INTO producto_categoria (id_categoria, id_producto)
                VALUES (${elem}, ${id_new_mate})`)
            })

            return true;
        

    } catch (error) {
        console.log(error)
        return false;
    }
}


export const deleteProductDB = async ( id:number) => {
    let query = await client.execute(`UPDATE productos
        SET 
        eliminado = 1
        WHERE id_mate = ${id}`) ;
        console.log( query)

}

export const editProductTurso = async ( id:number,productos:ProductosDBconCatnum)=>{
    console.log(productos);


    try {
        let query = await client.execute(`UPDATE productos
            SET codigo ='${productos.codigo}',
            cantidad = ${productos.cantidad},
            descripcion = '${productos.descripcion}',
            estado = ${productos.estado},
            eliminado = 0,
            precio = '${productos.precio}'
            WHERE id_mate = ${id}`) ;
            console.log( query)

          
            console.log(id)

            await client.execute(`DELETE FROM producto_categoria WHERE id_producto = ${id};`)

            await client.execute(`UPDATE nombrelink SET                
                 nombre_Link = '${productos.queryLink}'
            WHERE id_producto = ${id} `)
           
            productos.categorias.forEach( async (elem)  => {
                await client.execute(`INSERT INTO producto_categoria (id_categoria, id_producto)
                VALUES (${elem}, ${id})`)
            })

            return true;
        

    } catch (error) {
        console.log(error)
        return false;
    }
}


