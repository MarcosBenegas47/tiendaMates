"use client"

import { Category, ProductosInter } from "@/Productos"
import { CardProd } from "../component/CardProd"
import { filtrarProductos, searchProd, toSlug } from "../service/funcionAux"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Funnel } from "lucide-react"
import { Search } from "../component/Search"
type prop = {
    productos: ProductosInter[] | null,
    categorias: Category[] | null
}
export function Productos({ productos, categorias }: prop) {
    const [prods, setProds] = useState<ProductosInter[] | null>(productos)
    const [selected, setSelected] = useState<number[]>([])
    const [offset, setoffset] = useState(0)
    const [loading, setLoading] = useState(true)
    const [restaurado, setRestaurado] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    useEffect(() => {
        const saved = Number(sessionStorage.getItem("productosOffset") || 0)
        if (Number.isFinite(saved) && saved >= 0) setoffset(saved - (saved % 6))
        setRestaurado(true)
    }, [])

    useEffect(() => {
        if (!restaurado) return
        sessionStorage.setItem("productosOffset", offset.toString())
        let vigente = true
        setLoading(true)
        filtrarProductos(selected, offset).then((resultados) => {
            if (!vigente) return
            setProds(resultados || [])
        }).finally(() => {
            if (vigente) setLoading(false)
        })
        return () => { vigente = false }
    }, [selected, offset, restaurado])

    useEffect(() => {
        if (offset > 0) window.scrollTo({ top: 0, behavior: "smooth" })
    }, [offset])

    const aplicarFiltros = () => setoffset(0)
    const irAlFinal = async () => {
        if (loading || hasSearched) return
        const todos = await filtrarProductos(selected, 0, 10000)
        if (todos) setoffset(Math.floor(Math.max(0, todos.length - 1) / 6) * 6)
    }
    const conultaProducto = async (elem: string) => {

        const productos = await searchProd(toSlug(elem.trim()))
        setProds(productos)
        setHasSearched(elem.trim().length > 0)
    }

    return (<>
        <div className="flex justify-center  md:flex-row  gap-10 bg-white">
            <section className="hidden md:block">
                <div className="flex flex-col gap-2.5" >
                    <h2 className="font-bold flex gap-2">
                        <Funnel /> Filtros de búsqueda
                    </h2>
                    <div className="flex flex-col">
                        {/* <p className="font-bold">Categorias</p> */}
                        {categorias?.map(cat => (
                            <label className="flex gap-1 items-center " key={cat.id}>
                                <input
                                    type="checkbox"
                                    onClick={() => {
                                     setSelected(event => event.includes(cat.id) ? event.filter(id => id !== cat.id) : [...event, cat.id])
                                    }
                                    }
                                />
                                {cat.nombre}
                            </label>
                        ))}
                    </div>
                    <button className="bg-white w-full text-center pt-1 pb-1 pl-5 pr-5 border border-black rounded" onClick={aplicarFiltros}>Filtrar</button>
                </div>



            </section>

            <section className="flex flex-col justify-center  gap-10">

                <Search onSearch={conultaProducto} />
                <div className="flex gap-2 overflow-x-auto md:hidden">



                    <div className="pb-3 lg:fixed z-10 grid grid-cols-1  w-full">

                        <nav
                            className="-mb-px flex space-x-4 overflow-x-auto 
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            aria-label="Tabs"
                        >
                            {categorias?.map(cat => (
                                <button
                                 key={cat.id}
                                     onClick={()=>{
                                     setSelected((prev) => (
                                         prev.includes(cat.id)? prev.filter(id=>id !== cat.id) :[...prev, cat.id] ))
                                     setoffset(0)
                                    }}
                                  className={`flex-none px-4 py-2  rounded-full text-sm ${selected.includes(cat.id)? 'bg-black text-white border-black':'bg-white border border-gray-200'}`}>
                                    {cat.nombre}
                                </button>
                            ))}


                        </nav>
                    </div>




                </div>

                <div aria-busy={loading} className={`grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4 transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"}`}>
                    {prods?.map(producto => <CardProd key={producto.id} prod={producto} />)}
                    {!loading && prods?.length === 0 && <p className="col-span-full py-8 text-center">No se encontraron productos.</p>}
                </div>

                <section className="mb-5 flex flex-nowrap items-center justify-center gap-1 sm:gap-4">
                    <button disabled={offset === 0 || loading || hasSearched} onClick={() => setoffset(0)} className="whitespace-nowrap rounded-[20px] border border-black/40 px-1.5 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm">Inicio</button>

                    <div className="flex items-center rounded-[20px] border border-black/40 p-0.5 sm:p-1 sm:pr-2">
                        <button disabled={offset === 0 || loading} onClick={() => setoffset(Math.max(0, offset - 6))} className="flex items-center gap-0.5 whitespace-nowrap px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40 sm:gap-1 sm:px-3 sm:text-sm"><ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span>Anterior</span></button>
                    </div>


                    <div className="flex items-center rounded-[20px] border border-black/40 bg-black p-0.5 text-white sm:p-1 sm:pl-2">
                        <span aria-current="page" className="whitespace-nowrap px-1 text-[10px] font-semibold sm:px-2 sm:text-sm">Página {Math.floor(offset / 6) + 1}</span>
                    </div>

                    <div className="flex items-center rounded-[20px] border border-black/40 p-0.5 sm:p-1 sm:pl-2">
                        <button disabled={loading || hasSearched || (prods?.length ?? 0) < 6} onClick={() => setoffset(offset + 6)} className="flex items-center gap-0.5 whitespace-nowrap px-1 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40 sm:gap-1 sm:px-3 sm:text-sm"><span>Siguiente</span><ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
                    </div>

                    <button disabled={loading || hasSearched || (prods?.length ?? 0) < 6} onClick={irAlFinal} className="whitespace-nowrap rounded-[20px] border border-black/40 px-1.5 py-1 text-[10px] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm">Final</button>


                </section>
            </section>


        </div>
    </>)
}
