import { getProductAdmin } from "./adminProduct";
import { getProduct, getProductBySearch, getProductBySlug } from "./getProduct"

export async function filtrarProductos(categorias: number[] , offset= 0) {

  const productos = await getProduct(categorias,offset)

  return productos
}
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres raros
    .trim()
    .replace(/\s+/g, "-") // espacios → -
    .replace(/-+/g, "-"); // evita --- 
}

export async function  searchProd(slug:string){
  if(slug == ""){
    return await getProduct()
  }
  return await getProductBySearch(slug)
}

export async function  getBySlug(slug:string){
  return await getProductBySlug(slug)
}

export function formatearPrecio(precio:string) {
  return Number(precio)
    .toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
}
export async function filtrarProductosAdmin(categorias: number[] , offset= 0) {

  const productos = await getProductAdmin(categorias,offset)

  return productos
}
