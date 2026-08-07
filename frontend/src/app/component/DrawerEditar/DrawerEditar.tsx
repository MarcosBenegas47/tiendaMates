"use client"
import { Capacidad, Category, EstiloMate, Material, ProductosInter, ProductUpdate, Virola } from "@/Productos";
import { useEffect, useState } from "react";
import { getCapacidadAdmin, getCategorysAdmin, getEstiliosAdmin, getMaterialAdmin, getVirolaAdmin } from "@/app/service/adminUser";
import { updateProduct } from "@/app/service/adminProduct";
import {  X } from "lucide-react";
import AlertDialogSlide from "../ui/AlertDialogSlide";
import Alert from "../ui/Alert";

type Props = {
  open: boolean;
  prod: ProductosInter | null;
  onClose: () => void;
  onAlert: () => void;
};

export default function DrawerEditar({ open, onClose,onAlert, prod }: Props) {

  const [producto, setProducto] = useState<ProductosInter | null>(prod);
  const [category, setCategory] = useState<Category[]>([])
  const [virola, setvirola] = useState<Virola[]>()
  const [capacidad, setCapacidad] = useState<Capacidad[]>()
  const [material, setMaterial] = useState<Material[]>()
  const [esilo, setEstilo] = useState<EstiloMate[]>()
  const [imagePreview, setImagePreview] = useState <string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galery, setGalery] = useState<File[]>(  []);
  const [openAlert, setOpenAlert] = useState(false);

  console.log(producto)

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      // const prod = await getBySlug(slug);
      if (prod) {
        setProducto({
          ...prod,
          configuracion: prod.configuracion ?? {
            capacidad: {
              id: null,
              ml: null,
              descripcion: null,
            },
            estilo: {
              id: null,
              nombre: null
            },
            material: {
              id: null,
              nombre: null
            },
            virola: {
              id: null,
              nombre: null
            }
          }
        });
      }
    };
    const getCat = async () => {
      const cat = await getCategorysAdmin()
      if (cat != undefined) setCategory(cat);
    }


    const getCapacidad = async () => {
      const cap = await getCapacidadAdmin()
      if (cap != undefined) setCapacidad(cap);
    }
    const getEstilos = async () => {
      const est = await getEstiliosAdmin()
      if (est != undefined) setEstilo(est);
    }
    const getMaterial = async () => {
      const mat = await getMaterialAdmin()
      if (mat != undefined) setMaterial(mat);
    }
    const getVirola = async () => {
      const virola = await getVirolaAdmin()
      if (virola != undefined) setvirola(virola);
    }
    getEstilos()
    getCapacidad()
    getVirola()
    getMaterial()
    setImagePreview(producto?.imgURL ?? null)
    setImageFile(null);
    setGalery([]);

    getCat()
    fetchData();
  }, [open, prod]);
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setImagePreview(URL.createObjectURL(file));
  };
  const removeImage = (indexToremove: number) => {
    setGalery((prev) => prev.filter((_, index) => index != indexToremove));
  }
  const handleGaleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files || []);
    setGalery((prev) => [...prev, ...file])
  };
  function Field({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-400">{label}</label>
        {children}
      </div>
    );
  }
    useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  const handleform = (e: React.FormEvent) => {
    e.preventDefault();
    const id = producto?.id;
    console.log(producto)
    const productNew: ProductUpdate = {
      id: producto?.id,
      codigo: producto?.codigo,
      nombre: producto?.nombre,
      precio_unitario: producto?.precio_unitario,
      descripcion: producto?.descripcion ?? "",
      cantidad: producto?.cantidad ?? 0,
      eliminado: producto?.eliminado,
      estado: producto?.estado,
      categoria: producto?.categorias || [],
      query_link: producto?.query_link,
      configuracion: {
        idCapacidad: producto?.configuracion.capacidad.id,
        idEstilo: producto?.configuracion.estilo.id,
        idMaterial: producto?.configuracion.material.id,
        idVirola: producto?.configuracion.virola.id
      }
    }
    console.log(productNew)
    // validar antes de enviar
    const validarNulo = Object.values(productNew).some(valor => valor=== null) || Object.values(productNew.configuracion).some(valor => valor=== null)
    console.log( validarNulo);
    if( validarNulo) onAlert();
    if(!validarNulo) updateProduct(id, productNew);

  }
  const cerrarDrawer = ()=>{
    setImagePreview(null)

    onClose()
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
        <button onClick={  cerrarDrawer}>✕</button>
      </div>

      {/* CONTENIDO */}
      <form onSubmit={handleform} className="p-6 space-y-4 overflow-y-auto h-[calc(100%-100px)]">

        {/* <div className="border rounded-lg h-40 flex items-center justify-center text-gray-400">
        
          <img className="h-full " src={producto?.imgURL}/>


        </div> */}



        <section>
          <section>
            <p className="text-sm font-medium text-gray-800 mb-0.5">
              Imagen principal y galería
            </p>

            <p className="text-xs text-gray-400 mb-4">
              Cargá una imagen destacada y luego sumá variantes.
            </p>

            <label className="border border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors mb-4">

              <input
                type="file"
                accept="image/*"

                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-100"
                  />

                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      {imageFile?.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      Click para cambiar la imagen
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl text-gray-300">🖼</div>

                  <span className="text-sm font-medium text-gray-700">
                    Agregar imagen principal
                  </span>

                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    Usá la URL actual o subí una foto frontal del mate sobre fondo
                    claro.
                  </p>
                </>
              )}
            </label>
          </section>

          <Field label="Galería">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGaleryChange}
            />

            {
              galery.map((file, index) => (<div key={index}>
                <button type="button"
                  onClick={() => removeImage(index)}>

                  <span><X /></span>
                </button>
                <span>{file.name}</span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
              ))
            }
          </Field>
        </section>






        <input value={producto?.nombre || ""} onChange={(event) => setProducto(prev => prev ? { ...prev, nombre: event.target.value } : prev)} className="w-full border rounded-lg px-3 py-2" placeholder="Nombre" />


        <div className="flex gap-3">
          <input value={producto?.precio_unitario ?? ""} onChange={(e) =>
            setProducto(prev => prev && {
              ...prev,
              precio_unitario: e.target.value
            })
          } className="w-1/2 border rounded-lg px-3 py-2" placeholder="Precio" />
          <input value={producto?.cantidad ?? ""} onChange={(e) =>
            setProducto(prev => prev && {
              ...prev,
              cantidad: Number(e.target.value)
            })
          } className="w-1/2 border rounded-lg px-3 py-2" placeholder="Stock" />
        </div>
        <div className="flex gap-3">
          <select
            value={producto?.configuracion?.material?.id ?? ""}
            onChange={(event) => {
              const materialSeleccionada = material?.find(
                v => v.id === Number(event.target.value)
              );
              setProducto(prev =>
                prev && materialSeleccionada
                  ? {
                    ...prev,
                    configuracion: {
                      ...(prev.configuracion ?? {}),
                      material: materialSeleccionada,
                    },
                  }
                  : prev)
            }}

            className="w-full border rounded-lg px-3 py-2">
            <option>Seleccionar material</option>

            {material?.map(material => (
              <option value={material.id} key={material.id}>{material.nombre}</option>

            ))}


          </select>

          <select
            value={producto?.configuracion?.virola?.id ?? ""}
            onChange={(event) => {
              const virolaSeleccionada = virola?.find(
                v => v.id === Number(event.target.value)
              );
              setProducto(prev =>

                prev && virolaSeleccionada
                  ? {
                    ...prev,
                    configuracion: {
                      ...(prev.configuracion ?? {}),
                      virola: virolaSeleccionada,
                    },
                  }
                  : prev
              )
            }}
            className="w-full border rounded-lg px-3 py-2">
            <option>Seleccionar virola</option>

            {virola?.map(viro => (
              <option key={viro.id} value={viro.id}>{viro.nombre}</option>

            ))}

          </select>

        </div>
        <div className="flex gap-3">
          <select
            value={producto?.configuracion?.capacidad?.id ?? ""}
            onChange={(event) => {
              const capacudadSeleccionada = capacidad?.find(
                v => v.id === Number(event.target.value)
              );
              setProducto(prev =>
                prev && capacudadSeleccionada
                  ? {
                    ...prev,
                    configuracion: {
                      ...(prev.configuracion ?? {}),
                      capacidad: capacudadSeleccionada,
                    },
                  }
                  : prev
              )
            }
            }

            className="w-full border rounded-lg px-3 py-2">
            <option>Seleccionar capacidad</option>

            {capacidad?.map(cap => (
              <option value={cap.id} key={cap.id}>{cap.descripcion}</option>))
            }
          </select>

          <select
            value={producto?.configuracion?.estilo?.id || ""}
            onChange={(event) => {
              const estiloSeleccionada = esilo?.find(
                v => v.id === Number(event.target.value)
              );
              setProducto(prev =>
                prev && estiloSeleccionada
                  ? {
                    ...prev,
                    configuracion: {
                      ...(prev.configuracion ?? {}),
                      estilo: estiloSeleccionada,
                    },
                  }
                  : prev
              )
            }
            }

            className="w-full border rounded-lg px-3 py-2">
            <option>Seleccionar estilo</option>
            {esilo?.map(est => (
              <option value={est.id} key={est.id}>{est.nombre}</option>))
            }
          </select>


        </div>
        <select value={producto?.estado ? "true" : "false"} onChange={(e) => setProducto((prev) => prev ? {
          ...prev,
          estado: e.target.value === "true"
        } : prev)} className="w-full border rounded-lg px-3 py-2">

          <option value={"true"}>Activo</option>
          <option value={"false"}>Inactivo</option>

        </select>

        <div className="flex flex-col gap-2">
          {category?.map((c) => (
            <label key={c.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(producto?.categorias ?? []).includes(c.id)}
                onChange={(e) => {
                  setProducto(prev => {
                    if (!prev) return prev;
                    const categoriasActuales = prev.categorias
                    return {
                      ...prev,
                      categorias: e.target.checked ? [...categoriasActuales, c.id] : categoriasActuales.filter((id) => id !== c.id)
                    }
                  });
                }}
              />
              {c.nombre}
            </label>
          ))}
        </div>



        <textarea value={producto?.descripcion}
          onChange={(e) =>
            setProducto(prev => prev && {
              ...prev,
              descripcion: e.target.value
            })}
          className="w-full border rounded-lg px-3 py-2" rows={4} />

        <div className=" bottom-0 w-full mb-5 p-4 border-t flex justify-end gap-3 bg-white">
          <button onClick={onClose}>Cancelar</button>
          <button className="bg-black  text-white px-4 py-2 rounded-lg">
            Guardar Cambios
          </button>
        </div>
      </form>


    </div>
  );
}