"use client";

import { ButtonBlack, ButtonWhite } from "./ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CarrtoDropDown({ open, onClose }: Props) {
 console.log(open)
  return (
    <div className={`
           absolute right-0 z-50 top-full mt-2 w-90  bg-white rounded-[5px] border border-black/20  shadow-lg
        transition-all duration-300 origin-top-right
        ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
      `}
    >
        <section className="flex  justify-between  border-b border-black/10 p-3.5">
            <h3>
                Carrito
            </h3>
            <p> cantidad: 0</p>
        </section>
        <section className="p-3.5 border-b border-black/10">
            <p>No hay nada en el carrito</p>

        </section>
        <section className="bg-[#F2F2F2] p-3.5">
        <div className=" flex justify-between">
            <p>Subtotal</p>
            <p>$0</p> 
        </div>
        <div className="flex justify-between">
        <button  className="bg-white text-[15px] text-center pt-1 pb-1 pl-5 pr-5 border border-black rounded">Ver Carrito</button>    
<button  className="bg-black pt-1 pb-1 pl-5 pr-5 text-[15px] !text-white border border-white rounded">Confirmar Reserva</button>
        </div>
        </section>
    </div>
  );
}