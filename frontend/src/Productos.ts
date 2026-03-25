export interface Productos  {
    id: number,
    codigo: string,
    cantidad: number,
    descripcion: string,
    p_Unitario_final:string
    categoria:string[]
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