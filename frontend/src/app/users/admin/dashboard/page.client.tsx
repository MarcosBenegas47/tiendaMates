"use client";
import DrawerEditar from "@/app/component/DrawerEditar/DrawerEditar";
import AlertDialogSlide from "@/app/component/ui/AlertDialogSlide";
import { ProductosInter } from "@/Productos";
import { Package, Pencil, Trash } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { filtrarProductosAdmin, getBySlug } from "../../../service/funcionAux"

import Link from "next/link";
import { useEffect, useState } from "react";
import Alert from "@/app/component/ui/Alert";
import { verificarToken } from "@/app/service/adminUser";
import { tengoToken } from "@/app/service/useAuthStore";
import { useRouter } from "next/navigation";

export default function Dashboard({ product }: { product: ProductosInter[] | null }) {
    const [open, setOpen] = useState(false);
    const [producto, setProducto] = useState<ProductosInter | null> (null)
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertDrower, setOpenAlertDrower] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedId, setSelectedId] = useState<number | undefined>();
    const [offset, setoffset] = useState<number>(0)
    const [prods, setProds] = useState<ProductosInter[] | null>(product)
    const router = useRouter();

    const getProd = async (offset: number = 0 ) => {
        const productos = await filtrarProductosAdmin([], offset)
        console.log(productos)
        setProds(productos)
    }
     useEffect(()=>{
        const verificarSiHayToken = async () =>{
            if( !await tengoToken()) {
                setIsLoading(false)
                router.push("/users/login")
            }
            const data = await verificarToken() || {ok: false}
            if (!data.ok) {
            router.push("/users/login");
        }

        }
        verificarSiHayToken()   
     },[product])

    
    
    
    const handleClickOpenAlert = (id:number | undefined) => {

        setOpenAlert(true);
        setSelectedId(id);
    };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleEdit  = async (slug:string)=>{
    const prod = await getBySlug(slug); 
    if(prod){
        setProducto(prod)
        setOpen(true); 
    }
    
  }
    return <>
        {isLoading && (<div className="h-[calc(100dvh-96px)] bg-white flex ">
            <div className="flex flex-col  justify-between w-65 border border-black/10">
                <section className=" flex flex-col gap-2">
                    <Link href={"/users/admin/dashboard"} className="flex items-center">
                        <Package />
                        <p className="p-2.5"> Dashboard</p>
                    </Link>
                    <p className="p-2.5" >Clientes</p>
                    <p className="p-2.5">Reservas</p>
                    <Link href={"/users/admin/new"} className="p-2.5">Nuevo producto</Link>
                </section>
                <section className="border border-black/10">
                    <p>User</p>
                </section>
            </div>
            <div>

                <div className="w-full  bg-white rounded-xl border border-gray-200 overflow-hidden">

                    {/* HEADER */}
                    <div className="grid grid-cols-6 px-6 py-3 bg-gray-100 text-gray-600 text-sm font-medium">
                        <span>Producto</span>
                        <span>Destacado</span>
                        <span>Precio</span>
                        <span>Stock</span>
                        <span>Estado</span>
                        <span className="text-center">Acciones</span>
                    </div>

                    {/* FILAS */}
                    {prods?.map(prod => (
                        
                        <div
                            key={prod.id}
                            className="grid grid-cols-6 items-center px-6 py-4 border-t hover:bg-gray-50 transition"
                        >
                            {/* PRODUCTO */}
                            <div className="flex items-center gap-3">

                                <img
                                    src={prod.imgURL}
                                    alt={prod.nombre}
                                    className="w-12 h-12 rounded-lg object-cover border"
                                />
                                <span className="font-medium text-gray-800">
                                    {prod.nombre}
                                </span>
                            </div>

                            {/* CATEGORIA */}
                            
                            {/* <span className="text-gray-600">   </span> */}
                            <input
                                type="checkbox"
                                checked={!prod.destacado}
                                onChange={(e) => {
                                // setProducto(prev => {
                                //     if (!prev) return prev;
                                //     const categoriasActuales = prev.categorias
                                //     return {
                                //     ...prev,
                                //     categorias: e.target.checked ? [...categoriasActuales, c.id] : categoriasActuales.filter((id) => id !== c.id)
                                //     }
                                // });
                                }
                                 }
                            />
                            {/* PRECIO */}
                            <span className="font-medium text-gray-800">
                                ${prod.precio_unitario}
                            </span>

                            {/* STOCK */}
                            <span
                                className={`${prod.cantidad === 0 ? "text-red-500 font-semibold" : "text-gray-700"
                                    }`}
                            >
                                {prod.cantidad} un.
                            </span>

                            {/* ESTADO */}
                            <span
                                className={`px-3 py-1 text-xs rounded-full w-fit ${prod.estado == true
                                        ? "bg-black text-white"
                                        : prod.estado == false
                                            ? "bg-gray-200 text-gray-600"
                                            : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {prod.estado ? "Activo" : "agotado"}
                            </span>

                            {/* ACCIONES */}
                            <div className="flex justify-center gap-3 text-gray-500">
                                <button onClick={() => { handleEdit(prod.query_link)}} className="hover:text-black transition">
                                    <Pencil />
                                </button>
                                
                                {(<button onClick={() => handleClickOpenAlert(prod.id)} className="hover:text-red-500 transition">
                                    <Trash />
                                </button>)}
                            </div>
                        </div>
                    ))}

                </div>
                <section className="flex justify-center gap-4">
                    <div className="flex">
                        <ChevronLeft />
                        <button onClick={
                            () => {
                                if (offset > 0) {
                                    setoffset(offset - 6)
                                    getProd(offset - 6)
                                }

                            }}>Anterior</button>
                    </div>


                    <div className="flex">

                        <button onClick={() => {
                            setoffset(offset + 6)
                            getProd(offset + 6)
                        }}>Next</button>
                        <ChevronRight />
                    </div>


                </section>
            </div>
             <AlertDialogSlide open={openAlert} onClose={handleCloseAlert} id={selectedId}  />

            <div>
                <DrawerEditar open={open} onAlert={() => setOpenAlertDrower(true)} onClose={() => setOpen(false)} prod={producto}/>
                    <Alert open={openAlertDrower}   onClose={() => setOpenAlertDrower(false)} texto="No se pueden dejar campos nulos"  />
                    <Alert open={openAlertDrower}   onClose={() => setOpenAlertDrower(false)} texto="Guardado con exito"  />

            </div>

        </div>)}
    

    </>
}