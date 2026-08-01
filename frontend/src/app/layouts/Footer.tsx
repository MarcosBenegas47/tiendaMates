"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { cleanOffset } from "../service/utils";

export function Footer() {
  const router = useRouter();

  const goToProducts = (ruta: string) => {
    cleanOffset(ruta);
    router.push(ruta);
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Marca */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Tienda Mates
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Somos un emprendimiento familiar dedicado a ofrecer
              mates de calidad para quienes disfrutan compartir
              buenos momentos.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contacto
            </h3>

            <div className="space-y-2 text-gray-400">
              <p>📞 +54 11 5809-5101</p>
              <p>✉️ contacto@tiendamates.com</p>
              <p>📍 Buenos Aires, Argentina</p>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Navegación
            </h3>

            <nav className="flex flex-col gap-2 text-gray-400">
              <NextLink
                href="/"
                className="hover:text-white transition"
              >
                Inicio
              </NextLink>

              <button
                onClick={() => goToProducts("/productos")}
                className="text-left hover:text-white transition"
              >
                Productos
              </button>

              <NextLink
                href="/nosotros"
                className="hover:text-white transition"
              >
                Nosotros
              </NextLink>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
          © 2026 Tienda Mates. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}