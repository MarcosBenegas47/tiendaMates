"use Client"

import { Category, ProductosInter } from "@/Productos"
import { CardProd } from "../component/CardProd"
type prop={
productos:ProductosInter[] | null,
categorias:Category[] | null
}
export  function Productos({productos, categorias}:prop){
    return (<>
    <section className="flex justify-center gap-20">
        <div>
            <h2  className="font-bold">
                Filtros de búsqueda
            </h2>
            <div className="flex flex-col">
                <p  className="font-bold">Categorias</p>
                {categorias?.map(cat => (
                    <label key={cat.id}>
                        <input
                        type="checkbox"
                        // checked={isChecked}
                        // onChange={handleOnChange}
                        />
                        {cat.nombre}
                    </label>
                ))}
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
        {productos?.map(producto=> (
         <CardProd key={producto.id} prod={producto}/>
        ))}
        </div>
    </section>
    
      
   </>)
}