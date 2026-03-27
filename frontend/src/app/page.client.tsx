
import { ButtonBlack, ButtonWhite } from "./component/ui/Button";
import { Destacados } from "./component/Destacados";

export default function HomePage() {
  

  return (
    <main className=" flex flex-col">
      {/* <NavBar/> */}
      <section className="bg-black py-12 md:py-24 lg:py-29 flex items-center justify-center px-6"> 
        <div className="max-w-2xl flex flex-col gap-6 md:gap-8">

          <div>
            {/* Reducimos el texto en móvil (text-4xl) y lo agrandamos en desktop (md:text-6xl) */}
            <h2 className="text-white text-4xl md:text-6xl text-center font-bold leading-tight">
              El verdadero sabor de un buen mate
            </h2>
          </div>

          <div>
            {/* Ajustamos el tamaño del párrafo para que no sea tan invasivo en móvil */}
            <p className="text-white/60 text-center text-lg md:text-2xl leading-relaxed">
              Diseños exclusivos, materiales premium y la tradición siempre. Encontrá tu compañero de todos los días en nuestra tienda oficial.
            </p>
          </div>
          
          {/* En móvil los botones se ponen uno arriba del otro (flex-col) y en desktop de lado (md:flex-row) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mt-4">
            <div className="w-full md:w-auto text-center">
              <ButtonWhite link="/productos" text="Ver Productos" />
            </div>
            <div className="w-full md:w-auto text-center">
              <ButtonBlack link="" text="Cómo curar un mate" />
            </div>
          </div>
      
        </div>
      </section>
      
      <section className="flex flex-col items-center bg-white pt-5 px-4">
  <div className="w-full max-w-5xl"> 
    <div className="mt-5">
      <h2 className="text-4xl flex items-center font-bold">
        Nuestros destacados
        <img width="40" src="https://img.icons8.com/officel/80/mate.png" alt="mate" className="ml-2"/>
      </h2>
      <p className="mt-5">Descubrí los mates más elegidos por nuestra comunidad. Calidad premium garantizada</p>
      

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Destacados/>
      </div>
    </div>

    <div className="mt-10 flex justify-center">
      <ButtonWhite link="/productos" text="Ver Catálogo completo"/>
    </div>
  </div>
</section>


<section className="flex flex-col items-center mt-10 px-4 pb-20">
  <div className="w-full max-w-5xl">
    <h2 className="text-4xl flex items-center font-bold">
      Mates en acción
      <img width="40" src="https://img.icons8.com/officel/80/mate.png" alt="mate" className="ml-2"/>
    </h2>
    <p className="mt-2">Mira como se ven y como se prepara el mejor mate con nuestro porductos destacados</p>
    
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-7">
      <video
        className="w-full h-auto rounded-lg"
        controls
        src="https://res.cloudinary.com/dbw43etz4/video/upload/v1774402434/72761-544342500_small.webm"
      />
      <video
        className="w-full h-auto rounded-lg"
        controls
        src="https://res.cloudinary.com/dbw43etz4/video/upload/v1774402434/72761-544342500_small.webm"
      />
    </div>
  </div>
</section>
    </main>
  );
}