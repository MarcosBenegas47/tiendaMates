export interface Productos  {
    id: number,
    codigo: string,
    cantidad: number,
    descripcion: string,
    estado:boolean,
    p_Unitario_final:string,
    categoria:string[],
    queryLink:string,
}

export interface ProductosDB{
    id_mate:number,
    codigo:string,
    cantidad:number,
    descripcion:string,
    estado:boolean,
    eliminado:boolean,
    precio:string,
    queryLink:string,

}
export interface Category{
    id_categoria:number,
    categoria:string

}


export interface ProductosDBconCat extends ProductosDB{
    categorias:Category[]
}
export interface ProductosDBconCatnum extends ProductosDB{
    categorias:number[]
}
export interface ImagenInter {
    original:string,
    thumbnail:string
}

export interface Destacados {
    codigo:string,
    descripcion: string,
    id:number
}
