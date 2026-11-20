"use client";
import DrawerEditar from "@/app/component/DrawerEditar/DrawerEditar";
import AlertDialogSlide from "@/app/component/ui/AlertDialogSlide";
import { ProductosInter } from "@/Productos";
import { ChevronDown, Package, Pencil, Trash } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { filtrarProductosAdmin, getBySlug } from "../../../service/funcionAux"

import Link from "next/link";
import { useRef, useState } from "react";
import Alert from "@/app/component/ui/Alert";

export default function Dashboard({ product }: { product: ProductosInter[] | null }) {
    const [open, setOpen] = useState(false);
    const [producto, setProducto] = useState<ProductosInter | null> (null)
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertDrower, setOpenAlertDrower] = useState(false);
    const [mensajeAlertDrawer, setMensajeAlertDrawer] = useState("");
    const [selectedId, setSelectedId] = useState<number | undefined>();
    const editingSlugRef = useRef<string | null>(null);
    const [offset, setoffset] = useState<number>(0)
    const [prods, setProds] = useState<ProductosInter[] | null>(product)
    const [isChangingPage, setIsChangingPage] = useState(false)
    const [openActionsId, setOpenActionsId] = useState<number | undefined>()

    const getProd = async (newOffset: number = 0 ) => {
        if (newOffset < 0 || isChangingPage) return
        setIsChangingPage(true)
        try {
            const productos = await filtrarProductosAdmin([], newOffset)
            if (productos !== null) {
                setProds(productos)
                setoffset(newOffset)
            }
        } finally {
            setIsChangingPage(false)
        }
    }
    
    
    
    const handleClickOpenAlert = (id:number | undefined) => {

        setOpenAlert(true);
        setSelectedId(id);
    };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleEdit  = async (slug:string)=>{
    const prodEnLista = prods?.find((item) => item.query_link === slug);
    editingSlugRef.current = slug;
    if (prodEnLista) setProducto(prodEnLista);
    setOpen(true);
    const productoCompleto = await getBySlug(slug);
    if (productoCompleto && editingSlugRef.current === slug) setProducto(productoCompleto);
  }
    return <>
        {(<div className="h-[calc(100dvh-96px)] bg-white flex ">
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

                <div className="relative z-10 w-full rounded-xl border border-gray-200 bg-white overflow-visible">

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
                            <div className="relative flex justify-center text-gray-500">
                                <button
                                    type="button"
                                    aria-expanded={openActionsId === prod.id}
                                    onClick={() => setOpenActionsId(openActionsId === prod.id ? undefined : prod.id)}
                                    className="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-sm hover:bg-gray-100"
                                >
                                    Acciones <ChevronDown size={16} />
                                </button>
                                {openActionsId === prod.id && (
                                    <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                                        <button type="button" onClick={() => { setOpenActionsId(undefined); handleClickOpenAlert(prod.id); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50">
                                            <Trash size={16} /> Eliminar
                                        </button>
                                        <button type="button" onClick={() => { setOpenActionsId(undefined); handleEdit(prod.query_link); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50">
                                            <Pencil size={16} /> Edición rápida
                                        </button>
                                        <Link href={`/users/admin/edit/${encodeURIComponent(prod.query_link)}`} onClick={() => setOpenActionsId(undefined)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                                            <Pencil size={16} /> Editar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
                <section className="mb-5 mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Paginación de productos">
                    <button
                        disabled={offset === 0 || isChangingPage}
                        onClick={() => getProd(Math.max(0, offset - 6))}
                        className="flex items-center gap-1 rounded-[20px] border border-black/40 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft className="h-4 w-4" /> Anterior
                    </button>

                    {Array.from({ length: Math.floor(offset / 6) + 1 + ((prods?.length ?? 0) >= 6 ? 1 : 0) }, (_, index) => index).map((page) => {
                        const pageOffset = page * 6
                        const isCurrentPage = offset === pageOffset
                        return (
                            <button
                                key={page}
                                aria-current={isCurrentPage ? "page" : undefined}
                                disabled={isChangingPage}
                                onClick={() => getProd(pageOffset)}
                                className={`h-9 min-w-9 rounded-full border px-3 text-sm transition-colors disabled:cursor-wait ${isCurrentPage ? "border-black bg-black text-white" : "border-black/30 bg-white text-gray-700 hover:bg-gray-100"}`}
                            >
                                {page + 1}
                            </button>
                        )
                    })}

                    <button
                        disabled={isChangingPage || (prods?.length ?? 0) < 6}
                        onClick={() => getProd(offset + 6)}
                        className="flex items-center gap-1 rounded-[20px] border border-black/40 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Siguiente <ChevronRight className="h-4 w-4" />
                    </button>
                </section>
            </div>
             <AlertDialogSlide open={openAlert} onClose={handleCloseAlert} id={selectedId}  />

            <div>
                <DrawerEditar open={open} onAlert={(mensaje) => { setMensajeAlertDrawer(mensaje); setOpenAlertDrower(true); }} onClose={() => setOpen(false)} prod={producto}/>
                    <Alert open={openAlertDrower} onClose={() => { setOpenAlertDrower(false); setOpen(false); }} texto={mensajeAlertDrawer} />

            </div>

        </div>)}
    

    </>
}
