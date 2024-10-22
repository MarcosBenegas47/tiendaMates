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