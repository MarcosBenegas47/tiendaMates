"use client"
import { getProduct } from "@/app/service/getProduct";
import { Package } from "lucide-react";
import Link from "next/link";
import { Capacidad, Category, EstiloMate, Material, ProductCreate, ProductosInter, ProductUpdate, Virola } from "@/Productos";
import { useEffect, useState } from "react";
import { getCapacidadAdmin, getCategorysAdmin, getEstiliosAdmin, getMaterialAdmin, getVirolaAdmin } from "@/app/service/adminUser";
import { createNewProduct } from "@/app/service/adminProduct";




const initialForm: ProductCreate = {
  codigo: "",
  nombre: "",
  precio_unitario: 0,
  cantidad: 0,
  descripcion: "",
  imgFirst: "",
  galery: [],
  configuracion: {
    idEstilo: 0,
    idMaterial: 0,
    idVirola: 0,
    idCapacidad: 0,
  },
  query_link: "",
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
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300";

export default function Nuevo() {
  const [category, setCategory] = useState<Category[]>([])
  const [virola, setvirola] = useState<Virola[]>()
  const [capacidad, setCapacidad] = useState<Capacidad[]>()
  const [material, setMaterial] = useState<Material[]>()
  const [esilo, setEstilo] = useState<EstiloMate[]>()

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  useEffect(() => {

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
    getCat()
  }, []);

  // const handleform= (e: React.FormEvent)=>{
  //   e.preventDefault();
  //   const id = producto?.id;
  //   console.log(producto)
  //   const productNew:ProductUpdate = {
  //     id: producto?.id ,
  //     codigo: producto?.codigo ,
  //     nombre: producto?.nombre ,
  //     precio_unitario: producto?.precio_unitario,
  //     descripcion:producto?.descripcion ,
  //     cantidad:producto?.cantidad ?? 0,
  //     eliminado:producto?.eliminado ,
  //     estado:producto?.estado ,
  //     query_link:producto?.query_link ,
  //     imgURL:producto?.imgURL ,
  //     galery: producto?.galery,
  //     configuracion:{
  //       idCapacidad: producto?.configuracion.capacidad.id,
  //       idEstilo: producto?.configuracion.estilo.id,
  //       idMaterial:producto?.configuracion.material.id,
  //       idVirola: producto?.configuracion.virola.id
  //     }
  //   }
  //   console.log(productNew)

  //   createNewProduct(id, productNew)

  // }

  const [form, setForm] = useState<ProductCreate>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      configuracion: {
        ...prev.configuracion,
        [name]: Number(value), // el back espera int
      },
    }));
  };

  const handleGuardar = (tipo: "borrador" | "publicar") => {
    const payload: ProductCreate = {
      codigo: form.codigo,
      nombre: form.nombre,
      precio_unitario: form.precio_unitario,
      cantidad: form.cantidad,
      descripcion: form.descripcion,
      imgFirst: form.imgFirst,
      galery: form.galery,
      configuracion: form.configuracion, // ya tiene la forma exacta del back
      query_link: form.query_link,
    };

    console.log(`Guardar como ${tipo}:`, payload);
    // createNewProduct(payload); // o lo que uses para llamar al back
  };
  return (<>
    <section className="h-[calc(100dvh-96px)] bg-white flex ">
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
      <div className="w-full">
        <div className="min-h-screen w-full bg-gray-50 px-6 py-6 font-sans">
          {/* Breadcrumb */}
          <p className="text-xs text-gray-400 mb-3">
            Catálogo <span className="mx-1">›</span> Crear producto
          </p>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-medium text-gray-900 flex items-center gap-2">
              Nuevo producto 🧉
            </h1>
            <button
              onClick={() => history.back()}
              className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              ← Volver a productos
            </button>
          </div>

          {/* Alert card */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-800 mb-1">
                Alta individual de catálogo
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Vista dedicada para crear un producto sin mostrar la lista. Cargá la
                información principal, la configuración del mate y dejalo listo para
                publicar.
              </p>
            </div>
            <span className="shrink-0 text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-md">
              Producto nuevo
            </span>
          </div>

          {/* Form card */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-base font-medium text-gray-900">
                  Formulario de creación
                </p>
                <p className="text-sm text-gray-400 mt-0.5">
                  Campos basados en tu estructura de datos actual.
                </p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-md">
                ID problema: 1
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ─── Columna izquierda ─── */}
              <div className="space-y-6">
                {/* Información básica */}
                <section>
                  <p className="text-sm font-medium text-gray-800 mb-0.5">
                    Información básica
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Datos visibles para el catálogo y ficha de producto.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Código">
                      <input
                        name="codigo"
                        value={form.codigo}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Nombre">
                      <input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </Field>

                    <div className="col-span-2">
                      <Field label="Descripción">
                        <textarea
                          name="descripcion"
                          value={form.descripcion}
                          onChange={handleChange}
                          rows={3}
                          className={`${inputCls} resize-none`}
                        />
                      </Field>
                    </div>
                    <Field label="Precio unitario">
                      <input
                        name="precioUnitario"
                        type="number"
                        value={form.precio_unitario}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Cantidad">
                      <input
                        name="cantidad"
                        type="number"
                        value={form.cantidad}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </section>

                {/* Configuración del producto */}
                <section>
                  <p className="text-sm font-medium text-gray-800 mb-0.5">
                    Configuración del producto
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Atributos internos para describir el mate.
                  </p>



                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Estilo">
                      <select
                        name="idEstilo"
                        value={form.configuracion.idEstilo}
                        onChange={handleConfigChange}
                        className={inputCls}
                      >
                        <option value={0}>Seleccionar estilo</option>
                        {esilo?.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.nombre}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Material">
                      <select
                        name="idMaterial"
                        value={form.configuracion.idMaterial}
                        onChange={handleConfigChange}
                        className={inputCls}
                      >
                        <option value={0}>Seleccionar material</option>
                        {material?.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.nombre}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Virola">
                      <select
                        name="idVirola"
                        value={form.configuracion.idVirola}
                        onChange={handleConfigChange}
                        className={inputCls}
                      >
                        <option value={0}>Seleccionar virola</option>
                        {virola?.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.nombre}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Capacidad">
                      <select
                        name="idCapacidad"
                        value={form.configuracion.idCapacidad}
                        onChange={handleConfigChange}
                        className={inputCls}
                      >
                        <option value={0}>Seleccionar capacidad</option>
                        {capacidad?.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.descripcion}
                          </option>
                        ))}
                      </select>
                    </Field>
                    {/* <Field label="Capacidad ml">
                      <input
                        name="capacidadMl"
                        type="number"
                        value={form.capacidadMl}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </Field> */}
                  </div>
                </section>
              </div>

              {/* ─── Columna derecha ─── */}
              <div className="space-y-6">
                {/* Imagen */}
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
                      name="galeria"
                      value={form.galery}
                      onChange={handleChange}
                      placeholder="Sin imágenes adicionales (gallery: [])"
                      className={inputCls}
                    />
                  </Field>
                </section>

                {/* Estado de publicación */}
                <section>
                  <p className="text-sm font-medium text-gray-800 mb-0.5">
                    Estado de publicación
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    Controlá si el producto está visible o eliminado.
                  </p>

                  <div className="space-y-0 divide-y divide-gray-100">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Estado</p>
                        <p className="text-xs text-gray-400">
                          Producto activo en catálogo.
                        </p>
                      </div>
                      {/* <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="activo"
                          checked={form.}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-gray-200 peer-checked:bg-gray-900 rounded-full transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:w-[18px] after:h-[18px] after:transition-all peer-checked:after:translate-x-4" />
                      </label> */}
                    </div>

                    {/* <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Eliminado
                        </p>
                        <p className="text-xs text-gray-400">
                          Valor actual: {form ? "true" : "false"}
                        </p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-500 px-4 py-1.5 rounded-md">
                        No
                      </span>
                    </div> */}
                  </div>
                </section>

                {/* Resumen rápido */}
                <section className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Resumen rápido
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    Chequeá antes de guardar.
                  </p>
                  <div className="space-y-0 divide-y divide-gray-100">
                    {[
                      { key: "Nombre", val: form.nombre || "—" },
                      { key: "Código", val: form.codigo || "—" },
                      {
                        key: "Stock",
                        val: form.cantidad ? `${form.cantidad} unidades` : "—",
                      },
                      {
                        key: "Precio",
                        val: form.precio_unitario
                          ? `$${form.precio_unitario.toFixed(2)}`
                          : "—",
                      },
                      // {
                      //   key: "Configuración",
                      //   val:
                      //     form.configuracion. && form.configuracion.capacidadMl
                      //       ? `${form.material} · ${form.configuracion.capacidadMl} ml`
                      //       : "—",
                      // },
                    ].map(({ key, val }) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 text-xs"
                      >
                        <span className="text-gray-400">{key}</span>
                        <span className="font-medium text-gray-800">{val}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Podés guardar como borrador o publicar el mate directamente.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => history.back()}
                  className="text-sm text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleGuardar("borrador")}
                  className="text-sm text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Guardar borrador
                </button>
                <button
                  onClick={() => handleGuardar("publicar")}
                  className="text-sm font-medium bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  Crear producto →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}