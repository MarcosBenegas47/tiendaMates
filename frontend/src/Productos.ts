export interface ProductosInter  {
    id: number,
    codigo: string,
    cantidad: number,
    nombre: string,
    descripcion:string
    precio_unitario:string,
    eliminado:boolean,
    estado:boolean,
    query_link:string
    imgURL:string,
    galery:string[],
    configuracion:ConfigProduct

}

export interface ConfigProduct {
    capacidad: string ,
    capacidad_ml: number,
    estilo:string,
    material:string,
    virola:string
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
export interface Category {
  id: string;
  nombre: string;
};