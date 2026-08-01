const pasos = [
  {
    id: 1,
    tag: "AMBOS TIPOS",
    titulo: "Lavar y preparar",
    descripcion:
      "Enjuagá el interior del mate con agua tibia y secalo con papel absorbente para eliminar restos de polvo. No uses detergente ni jabón, solo agua natural.",
  },
  {
    id: 2,
    tag: "VARÍA SEGÚN TIPO",
    titulo: "Preparar el interior",
    descripcion:
      "Dependiendo del material de tu mate, el proceso de preparación inicial es diferente.",
    variantes: true,
  },
  {
    id: 3,
    tag: "SOLO CALABAZA",
    titulo: "Agregar agua tibia",
    descripcion:
      "Echá un poco de agua tibia para que la yerba (o la grasa en madera) penetre todos los poros del mate.",
  },
  {
    id: 4,
    tag: "VARÍA SEGÚN TIPO",
    titulo: "Dejar reposar",
    descripcion:
      "El tiempo de reposo es clave para un curado efectivo.",
    reposo: true,
  },
  {
    id: 5,
    tag: "SOLO CALABAZA",
    titulo: "Raspado del hollejo",
    descripcion:
      "Pasadas las 24 horas, raspá suavemente las paredes internas para quitar el hollejo.",
  },
  {
    id: 6,
    tag: "AMBOS TIPOS",
    titulo: "Repetir el proceso",
    descripcion:
      "Para un curado perfecto, repetí el ciclo completo entre 2 y 3 veces en días consecutivos.",
  },
];

export default function Como_curar_el_mate() {
  return (
    <>

      <section className="max-w-4xl mx-auto px-6 py-16">

  <div className="text-center mb-20">
    <h1 className="text-4xl md:text-6xl font-bold">
      Cómo Curar un Mate 🧉
    </h1>

    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
      Curar el mate es el paso más importante antes de usarlo por primera vez,
      porque ayuda a sellar los poros y mejora la experiencia.
    </p>

    <div className="flex justify-center gap-3 mt-8">
      <button className="px-5 py-2 rounded-md bg-black text-white text-sm font-medium">
        🧉 Mate de Calabaza
      </button>

      <button className="px-5 py-2 rounded-md border text-sm font-medium">
        🌳 Mate de Madera
      </button>
    </div>
  </div>

  <div className="relative">

    {/* Línea */}
    <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gray-300" />

    <div className="space-y-16">

      {pasos.map((paso) => (
        <div key={paso.id} className="relative flex gap-8">

          {/* Número */}
          <div className="relative z-10 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
              {paso.id}
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-1 -mt-1">

            <span className="
              inline-flex
              items-center
              rounded-full
              bg-stone-100
              px-2
              py-1
              text-[10px]
              font-semibold
              tracking-wider
              text-stone-500
            ">
              {paso.tag}
            </span>

            <h3 className="mt-3 text-xl font-bold text-stone-900">
              {paso.titulo}
            </h3>

            <p className="mt-2 text-sm leading-7 text-stone-600 max-w-3xl">
              {paso.descripcion}
            </p>

            {paso.variantes && (
              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <div className="bg-[#F6F0E7] rounded-md p-4">
                  <h4 className="font-semibold text-sm mb-2">
                    🧉 Calabaza
                  </h4>

                  <p className="text-xs text-stone-600 leading-6">
                    Llená el interior casi hasta arriba con yerba mate húmeda y usada.
                  </p>
                </div>

                <div className="bg-[#F6F0E7] rounded-md p-4">
                  <h4 className="font-semibold text-sm mb-2">
                    🌳 Madera
                  </h4>

                  <p className="text-xs text-stone-600 leading-6">
                    Untá las paredes internas con manteca o aceite usando papel limpio.
                  </p>
                </div>

              </div>
            )}

            {paso.reposo && (
              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <div className="bg-[#F6F0E7] rounded-md p-4">
                  <h4 className="font-semibold text-sm mb-2">
                    🧉 Calabaza
                  </h4>

                  <p className="text-xs text-stone-600 leading-6">
                    Dejá reposar 24 horas. Si la yerba se seca en la superficie,
                    agregá más agua tibia.
                  </p>
                </div>

                <div className="bg-[#F6F0E7] rounded-md p-4">
                  <h4 className="font-semibold text-sm mb-2">
                    🌳 Madera
                  </h4>

                  <p className="text-xs text-stone-600 leading-6">
                    Dejá reposar 12 horas con la grasa.
                    Luego retirala con papel absorbente.
                  </p>
                </div>

              </div>
            )}

          </div>
        </div>
      ))}

    </div>
  </div>
</section>
    </>
  );
}