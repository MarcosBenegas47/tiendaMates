export interface ProductosInter  {
    id: number| undefined,
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
    capacidad: Capacidad ,
    estilo:EstiloMate,
    material:Material,
    virola:Virola
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
  id: number;
  nombre: string;
};




export interface  ConfiProductCreate{
    idEstilo: number | undefined,
    idMaterial: number | undefined,
    idVirola: number | undefined,
    idCapacidad: number | undefined,
}
export interface ProductCreate{
    codigo: string,
    nombre: string,
    precio_unitario: number
    cantidad: number,
    descripcion:string,
    categoria:number[],
    // imgFirst:string,
    // galery:string[]
    configuracion:ConfiProductCreate
    // query_link: string
}

export interface ProductUpdate{
    id: number | undefined,
    codigo: string | undefined,
    nombre: string | undefined,
    precio_unitario:string | undefined,
    descripcion:string | undefined,
    cantidad:number | undefined,
    eliminado:boolean | undefined,
    estado:boolean| undefined,
    query_link:string | undefined,
    configuracion:ConfiProductCreate
}


export interface Producto_categoria{

    producto_id:number
    categoria_id :number
    }
export interface EstiloMate{
    id:number
    nombre:string
}


export interface Material{
    id:number
    nombre:string
}


export interface Virola{
    id:number
    nombre:string
}

export interface Capacidad{
    id:number
    ml:number
    descripcion:string
}


export interface ProductForm {
  codigo: string;
  nombre: string;
  precio_unitario: number;
  cantidad: number;
  descripcion: string;
  imgFirst: string;
  galery: string[];
  configuracion: ConfiProductCreate;
  query_link: string;
}

