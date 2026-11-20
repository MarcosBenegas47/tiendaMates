"use client";

import { Capacidad, Category, EstiloMate, Material, ProductosInter, ProductUpdate, Virola } from "@/Productos";
import { getCapacidadAdmin, getCategorysAdmin, getEstiliosAdmin, getMaterialAdmin, getVirolaAdmin } from "@/app/service/adminUser";
import { updateProductFull } from "@/app/service/adminProduct";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type NewImage = { file: File; preview: string };

export default function EditProductForm({ product }: { product: ProductosInter }) {
  const router = useRouter();
  const [category, setCategory] = useState<Category[]>([]);
  const [styles, setStyles] = useState<EstiloMate[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [virolas, setVirolas] = useState<Virola[]>([]);
  const [capacities, setCapacities] = useState<Capacidad[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>(product.galery ?? []);
  const [newGallery, setNewGallery] = useState<NewImage[]>([]);
  const newGalleryRef = useRef(newGallery);
  newGalleryRef.current = newGallery;
  const [mainImage, setMainImage] = useState<string | null>(product.imgURL || null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [removeMainImage, setRemoveMainImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProductUpdate>({
    id: product.id,
    codigo: product.codigo ?? "",
    nombre: product.nombre ?? "",
    precio_unitario: String(product.precio_unitario ?? ""),
    descripcion: product.descripcion ?? "",
    cantidad: product.cantidad ?? 0,
    eliminado: product.eliminado ?? false,
    estado: product.estado ?? true,
    destacado: product.destacado ?? false,
    query_link: product.query_link ?? "",
    categoria: product.categorias ?? [],
    configuracion: {
      idEstilo: product.configuracion?.estilo?.id ?? null,
      idMaterial: product.configuracion?.material?.id ?? null,
      idVirola: product.configuracion?.virola?.id ?? null,
      idCapacidad: product.configuracion?.capacidad?.id ?? null,
    },
  });

  useEffect(() => {
    getCategorysAdmin().then((items) => items && setCategory(items));
    getEstiliosAdmin().then((items) => items && setStyles(items));
    getMaterialAdmin().then((items) => items && setMaterials(items));
    getVirolaAdmin().then((items) => items && setVirolas(items));
    getCapacidadAdmin().then((items) => items && setCapacities(items));
    return () => newGalleryRef.current.forEach(({ preview }) => URL.revokeObjectURL(preview));
  }, []);

  const updateField = <K extends keyof ProductUpdate>(key: K, value: ProductUpdate[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const updateConfig = (key: keyof ProductUpdate["configuracion"], value: number | null) => {
    setForm((previous) => ({ ...previous, configuracion: { ...previous.configuracion, [key]: value } }));
  };

  const selectMainImage = (file?: File) => {
    if (!file) return;
    if (mainImage?.startsWith("blob:")) URL.revokeObjectURL(mainImage);
    setMainImage(URL.createObjectURL(file));
    setMainImageFile(file);
    setRemoveMainImage(false);
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newGallery[index].preview);
    setNewGallery((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.id || !form.nombre || !form.codigo) {
      setError("Completá el nombre y el código del producto.");
      return;
    }
    if (!form.configuracion.idEstilo || !form.configuracion.idMaterial || !form.configuracion.idVirola || !form.configuracion.idCapacidad) {
      setError("Seleccioná estilo, material, virola y capacidad antes de guardar.");
      return;
    }
    setSaving(true);
    setError("");
    const result = await updateProductFull(
      form.id,
      form,
      mainImageFile,
      newGallery.map(({ file }) => file),
      existingGallery,
      removeMainImage,
    );
    setSaving(false);
    if (!result.ok) {
      setError(result.error ?? "No se pudo guardar el producto. Revisá los datos e intentá nuevamente.");
      return;
    }
    router.push("/users/admin/dashboard");
    router.refresh();
  };

  const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gray-400 focus:outline-none";
  const labelClass = "flex flex-col gap-1.5 text-xs text-gray-500";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs text-gray-400">Catálogo <span className="mx-1">›</span> Editar producto</p>
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-medium text-gray-900">Editar producto 🧉</h1>
          <Link href="/users/admin/dashboard" className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">← Volver al dashboard</Link>
        </header>

        <form onSubmit={save} className="rounded-xl border border-gray-100 bg-white p-5 md:p-7">
          <div className="mb-6">
            <h2 className="font-medium text-gray-900">Información del producto</h2>
            <p className="mt-1 text-sm text-gray-400">Modificá los datos, la configuración y las imágenes.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className={labelClass}>Código<input className={inputClass} value={form.codigo ?? ""} onChange={(e) => updateField("codigo", e.target.value)} /></label>
                <label className={labelClass}>Nombre<input className={inputClass} value={form.nombre ?? ""} onChange={(e) => updateField("nombre", e.target.value)} /></label>
                <label className={labelClass}>Precio unitario<input type="number" step="0.01" className={inputClass} value={form.precio_unitario ?? ""} onChange={(e) => updateField("precio_unitario", e.target.value)} /></label>
                <label className={labelClass}>Cantidad<input type="number" className={inputClass} value={form.cantidad ?? 0} onChange={(e) => updateField("cantidad", Number(e.target.value))} /></label>
                <label className={`${labelClass} sm:col-span-2`}>Descripción<textarea rows={4} className={`${inputClass} resize-y`} value={form.descripcion ?? ""} onChange={(e) => updateField("descripcion", e.target.value)} /></label>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-medium text-gray-800">Configuración del producto</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className={labelClass}>Estilo<select className={inputClass} value={form.configuracion.idEstilo ?? ""} onChange={(e) => updateConfig("idEstilo", e.target.value ? Number(e.target.value) : null)}><option value="">Sin estilo</option>{styles.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></label>
                  <label className={labelClass}>Material<select className={inputClass} value={form.configuracion.idMaterial ?? ""} onChange={(e) => updateConfig("idMaterial", e.target.value ? Number(e.target.value) : null)}><option value="">Sin material</option>{materials.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></label>
                  <label className={labelClass}>Virola<select className={inputClass} value={form.configuracion.idVirola ?? ""} onChange={(e) => updateConfig("idVirola", e.target.value ? Number(e.target.value) : null)}><option value="">Sin virola</option>{virolas.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></label>
                  <label className={labelClass}>Capacidad<select className={inputClass} value={form.configuracion.idCapacidad ?? ""} onChange={(e) => updateConfig("idCapacidad", e.target.value ? Number(e.target.value) : null)}><option value="">Sin capacidad</option>{capacities.map((item) => <option key={item.id} value={item.id}>{item.descripcion}</option>)}</select></label>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-sm font-medium text-gray-800">Categorías</h3>
                <div className="grid grid-cols-2 gap-2">
                  {category.map((item) => <label key={item.id} className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={form.categoria.includes(item.id)} onChange={(e) => updateField("categoria", e.target.checked ? [...form.categoria, item.id] : form.categoria.filter((id) => id !== item.id))} />{item.nombre}</label>)}
                </div>
              </section>

              <section className="flex flex-wrap gap-5 border-t border-gray-100 pt-4">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.estado ?? false} onChange={(e) => updateField("estado", e.target.checked)} />Activo</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.destacado ?? false} onChange={(e) => updateField("destacado", e.target.checked)} />Destacado</label>
              </section>
            </div>

            <section>
              <h3 className="mb-1 text-sm font-medium text-gray-800">Imagen principal y galería</h3>
              <p className="mb-4 text-xs text-gray-400">Podés cambiar o quitar la imagen principal y administrar las fotos de la galería.</p>
              <div className="mb-5 rounded-xl border border-dashed border-gray-200 p-4">
                <label className="flex cursor-pointer flex-col items-center gap-3">
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => selectMainImage(e.target.files?.[0])} />
                  {mainImage ? <img src={mainImage} alt="Imagen principal" className="h-36 w-36 rounded-lg object-contain" /> : <div className="flex h-36 w-36 items-center justify-center text-center text-sm text-gray-400">Sin imagen principal · Clic para agregar</div>}
                  <span className="text-xs text-gray-500">{mainImage ? "Clic para cambiar la imagen" : "Agregar imagen principal"}</span>
                </label>
                {mainImage && <button type="button" onClick={() => { if (mainImage.startsWith("blob:")) URL.revokeObjectURL(mainImage); setMainImage(null); setMainImageFile(null); setRemoveMainImage(true); }} className="mt-2 text-xs text-red-600 underline">Quitar imagen principal</button>}
              </div>

              <label className="mb-3 inline-flex cursor-pointer items-center rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">
                Agregar fotos a la galería<input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { const files = Array.from(e.target.files ?? []); setNewGallery((previous) => [...previous, ...files.map((file) => ({ file, preview: URL.createObjectURL(file) }))]); e.target.value = ""; }} />
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {existingGallery.map((url, index) => <div key={`${url}-${index}`} className="relative overflow-hidden rounded-lg border border-gray-200"><img src={url} alt={`Foto de galería ${index + 1}`} className="h-28 w-full object-cover" /><button type="button" aria-label="Quitar foto de galería" onClick={() => setExistingGallery((previous) => previous.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-1 top-1 rounded-full bg-white p-1 text-red-600 shadow"><X size={16} /></button><span className="block px-2 py-1 text-xs text-gray-500">Existente</span></div>)}
                {newGallery.map(({ file, preview }, index) => <div key={`${file.name}-${index}`} className="relative overflow-hidden rounded-lg border border-gray-200"><img src={preview} alt={`Vista previa de ${file.name}`} className="h-28 w-full object-cover" /><button type="button" aria-label={`Quitar ${file.name}`} onClick={() => removeNewImage(index)} className="absolute right-1 top-1 rounded-full bg-white p-1 text-red-600 shadow"><X size={16} /></button><span className="block truncate px-2 py-1 text-xs text-gray-500">{file.name}</span></div>)}
              </div>
            </section>
          </div>

          {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5">
            <Link href="/users/admin/dashboard" className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Cancelar</Link>
            <button type="submit" disabled={saving} className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50">{saving ? "Guardando…" : "Guardar cambios"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
