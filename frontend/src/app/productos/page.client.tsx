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
    const [offset, setoffset] = useState<number>(()=>{
        if(typeof window !== "undefined"){
        const saved = sessionStorage.getItem("offset")
        return saved? Number(saved ): 0
        }
        return 0
    })
    console.log(offset)

    const getProd = async (offset: number = 0 ) => {
        const productos = await filtrarProductos(selected, offset)
        console.log(offset)
        setProds(productos)
    }
        
    useEffect(() => {
        sessionStorage.setItem("offset", offset.toString())
        getProd(offset)
    }, [offset])
    const conultaProducto = async (elem:string) => {
        
        const productos = await searchProd(toSlug(elem.trim()))
        console.log(productos)
        setProds(productos)
    }
    return (<>
        <div className="flex justify-center  md:flex-row  gap-10 bg-white">
            <section className="hidden md:block">
                <div >
                    <h2 className="font-bold flex gap-2">
                        <Funnel /> Filtros de búsqueda
                    </h2>
                    <div className="flex flex-col">
                        <p className="font-bold">Categorias</p>
                        {categorias?.map(cat => (
                            <label key={cat.id}>
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        setSelected(event => event.includes(cat.id) ? event.filter(id => id !== cat.id) : [...event, cat.id])
                                    }
                                    }
                                />
                                {cat.nombre}
                            </label>
                        ))}
                    </div>
                    <button onClick={() => getProd()}>Filtrar</button>
                </div>
            </section>

            <section className="flex flex-col justify-center  gap-10">

                <Search onSearch={conultaProducto}/>
                <div className="flex gap-2 overflow-x-auto md:hidden">
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
                    {prods?.map(producto => (
                        <CardProd key={producto.id} prod={producto} />
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
            </section>


        </div>
    </>)
}