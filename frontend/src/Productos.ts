export interface ProductosInter  {
    id: number,
    codigo: string,
    cantidad: number,
    nombre: string,
    precio_unitario:string,
    eliminado:boolean,
    estado:boolean,
    query_link:string
    imgURL:string
}

export interface ImagenInter {
    original:string,
    thumbnail:string
}

export interface Destacados {
    id: number,
    codigo: string,
    nombre:string,
    precio_unitario: string,
    cantidad: number,
    eliminado:boolean,
    estado: boolean,
    query_link:string,
    imgURL:string
}
export interface Category{
    nombre:string,
    id:number
} 