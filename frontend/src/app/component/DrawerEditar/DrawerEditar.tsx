"use client"
import { Category, ProductosInter } from "@/Productos";
import { getProductBySlug } from "../../service/getProduct";
import { getBySlug } from "@/app/service/funcionAux";
import { useEffect, useState } from "react";
import { getCapacidadAdmin, getCategorysAdmin, getEstiliosAdmin, getMaterialAdmin, getVirolaAdmin } from "@/app/service/serviceUser";

type Props = {
  open: boolean;
  slug:string
  onClose: () => void;
};

export default  function DrawerEditar({ open, onClose,slug }: Props) {
    
    const [producto, setProducto] = useState <ProductosInter | null>(null);
    const [category, setCategory] = useState<Category[]>([])
    const [virola, setvirola] = useState<any[]>()
    const [capacidad, setCapacidad] = useState<any[]>()
    const [material, setMaterial] = useState<any[]>()
    const [esilo, setEstilo] = useState<any[]>()


    useEffect(() => {
      if (!open) return;

      const fetchData = async () => {
        const prod = await getBySlug(slug);
        if(prod != undefined) setProducto(prod);
      };
      const getCat = async()=> {
        const cat = await getCategorysAdmin()
        if(cat != undefined) setCategory(cat);
      }


      const getCapacidad = async( )=>{
        const cap = await getCapacidadAdmin()
        if(cap != undefined) setCapacidad(cap);
      }
      const getEstilos = async( )=>{
        const est = await getEstiliosAdmin()
        if(est != undefined) setEstilo(est);
      }
      const getMaterial = async( )=>{
        const mat = await getMaterialAdmin()
        if(mat != undefined) setMaterial(mat);
      }
      const getVirola= async( )=>{
        const virola = await getVirolaAdmin()
        if(virola != undefined) setvirola(virola);
      }
      getEstilos()
      getCapacidad()
      getVirola()
      getMaterial()


      
      getCat()
      fetchData();
    }, [open, slug]);

    const handleform=()=>{
      
    }
  return (
    <div 
      className={`
         h-full bg-white border-l overflow-hidden
    transition-all duration-300 ease-in-out
        ${open ? " w-[420px]" : "w-[0px] "}
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="font-semibold">Editar Producto 🧉</h2>
        <button onClick={onClose}>✕</button>
      </div>

      {/* CONTENIDO */}
      <form onSubmit={handleform} className="p-6 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
        
        <div className="border rounded-lg h-40 flex items-center justify-center text-gray-400">
        
          <img className="h-full " src={producto?.imgURL}/>
        </div>
        <input value={producto?.nombre || "" } onChange={(event) => setProducto(prev=> prev? {...prev, nombre:event.target.value}:prev)} className="w-full border rounded-lg px-3 py-2" placeholder="Nombre" />

        <select className="w-full border rounded-lg px-3 py-2">
          {category?.map(cat =>(
          <option key={cat.id}>{cat.nombre}</option>

         ))}
        </select>

        <div className="flex gap-3">
          <input value={producto?.precio_unitario ??""} onChange={(e) =>
              setProducto(prev => prev && {
                ...prev,
                precio_unitario: e.target.value
              })
            }  className="w-1/2 border rounded-lg px-3 py-2" placeholder="Precio" />
          <input value={producto?.cantidad ??""} onChange={(e) =>
              setProducto(prev => prev && {
                ...prev,
                cantidad: Number(e.target.value)
              })
            } className="w-1/2 border rounded-lg px-3 py-2" placeholder="Stock" />
        </div>
        <div className="flex gap-3">
          <select
           value={producto?.configuracion.virola ?? ""}
          onChange={(event) =>
            setProducto(prev =>
              prev
                ? {
                    ...prev,
                    configuracion: {
                      ...prev.configuracion,
                      material: event.target.value,
                    },
                  }
                : prev)} 
          
          className="w-full border rounded-lg px-3 py-2">
         {material?.map(material =>(
          <option key={material.id}>{material.nombre}</option>

         ))}

          
        </select>

        <select
          value={producto?.configuracion.virola ?? ""}
          onChange={(event) =>
            setProducto(prev =>
              prev
                ? {
                    ...prev,
                    configuracion: {
                      ...prev.configuracion,
                      virola: event.target.value,
                    },
                  }
                : prev
            )}  
          className="w-full border rounded-lg px-3 py-2">
          {virola?.map(viro =>(
          <option key={viro.id}>{viro.nombre}</option>

         ))}
          
        </select>

          {/* <input value={producto?.precio_unitario} className="w-1/2 border rounded-lg px-3 py-2" placeholder="Precio" />
          <input value={producto?.cantidad} className="w-1/2 border rounded-lg px-3 py-2" placeholder="Stock" /> */}
        </div>
        <div className="flex gap-3">
          <select 
          value={producto?.configuracion.capacidad}
            onChange={(event) =>
              setProducto(prev =>
                prev
                  ? {
                      ...prev,
                      configuracion: {
                        ...prev.configuracion,
                        capacidad: event.target.value,
                      },
                    }
                  : prev
              )
            }
          
          className="w-full border rounded-lg px-3 py-2">
          {capacidad?.map(cap =>(
          <option key={cap.id}>{cap.descripcion}</option>))
        }
          
        </select>
        <select
        value={producto?.configuracion.estilo || ""}
            onChange={(event) =>
              setProducto(prev =>
                prev
                  ? {
                      ...prev,
                      configuracion: {
                        ...prev.configuracion,
                        estilo: event.target.value,
                      },
                    }
                  : prev
              )
            }
        
        className="w-full border rounded-lg px-3 py-2">
          {esilo?.map(est =>(
          <option key={est.id}>{est.nombre}</option>))
        }
          
          
        </select>


          {/* <input value={producto?.precio_unitario} className="w-1/2 border rounded-lg px-3 py-2" placeholder="Precio" />
          <input value={producto?.cantidad} className="w-1/2 border rounded-lg px-3 py-2" placeholder="Stock" /> */}
        </div>


        <select className="w-full border rounded-lg px-3 py-2">
          <option>Activo</option>
          <option>Inactivo</option>
          
        </select>

        <textarea value={producto?.descripcion} className="w-full border rounded-lg px-3 py-2" rows={4} />
        <div className=" bottom-0 w-full mb-5 p-4 border-t flex justify-end gap-3 bg-white">
          <button onClick={onClose}>Cancelar</button>
          <button className="bg-black  text-white px-4 py-2 rounded-lg">
            Guardar Cambios
          </button>
        </div>
      </form>

      {/* FOOTER */}
      
    </div>
  );
}