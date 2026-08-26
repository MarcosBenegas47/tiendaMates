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
    const [selectedFilter, setSelectedFilter] = useState<number[]>([])

    const [productAnt, setProductAnt] = useState<ProductosInter[] | null>();

    const [offset, setoffset] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const saved = sessionStorage.getItem("offset")
            return saved ? Number(saved) : 0
        }
        return 0
    })
useEffect(() => {
    getProd();
}, [selected]);

    const getProd = async (offset: number = 0) => {
        setProductAnt(prods);
        if(selectedFilter.length !== 0) setSelected(selectedFilter);

        const productos = await filtrarProductos(selected, offset)
       
        console.log(productos?.length)
        if(productos?.length== 0) {
            setProds(productAnt ?? [])
            setoffset(offset-6  )
            
        }else{
            setProds(productos)
            setoffset(offset )

        }
    }

    useEffect(() => {
        sessionStorage.setItem("offset", offset.toString())
        getProd(offset)
    }, [offset])
    const conultaProducto = async (elem: string) => {

        const productos = await searchProd(toSlug(elem.trim()))
        setProds(productos)
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
                                        setSelectedFilter(event => event.includes(cat.id) ? event.filter(id => id !== cat.id) : [...event, cat.id])
                                    }
                                    }
                                />
                                {cat.nombre}
                            </label>
                        ))}
                    </div>
                    <button className="bg-white w-full  text-center pt-1 pb-1 pl-5 pr-5 border border-black rounded" onClick={() => getProd()}>Filtrar</button>
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
                                 onClick={(e)=>{
                                    setSelected((prev) => (
                                        prev.includes(cat.id)? prev.filter(id=>id !== cat.id) :[...prev, cat.id] ))
                                    // getProd()
                                    }}
                                  className={`flex-none px-4 py-2  rounded-full text-sm ${selected.includes(cat.id)? 'bg-black text-white border-black':'bg-white border border-gray-200'}`}>
                                    {cat.nombre}
                                </button>
                            ))}


                        </nav>
                    </div>




                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4">
                    {prods?.map(producto => (
                        <CardProd key={producto.id} prod={producto} />
                    ))
                    }
                </div>

                <section className="flex justify-center gap-4 mb-5">
                    <div className="flex p-1 pr-2  rounded-[20px] border border-black/40">
                        <ChevronLeft />
                        <button onClick={
                            () => {
                                if (offset > 0) {
                                    getProd(offset - 6)
                                }

                            }}>Anterior</button>
                    </div>


                    <div className="flex rounded-[20px] border border-black/40 p-1 pl-2">

                        <button onClick={() => {
                            getProd(offset + 6)
                        }}>Siguiente</button>
                        <ChevronRight />
                    </div>


                </section>
            </section>


        </div>
    </>)
}