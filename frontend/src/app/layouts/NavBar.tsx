import { Search } from "lucide-react";
import Link from "next/link";


export function NavBar(){
    return ( <>
    <header className=" flex  ">
        <nav className="h-24 flex items-center justify-around  w-full ">
            <div className="flex items-center ">
                            <h1 className="text-2xl uppercase">Tienda Mates </h1>

                    <img width="30" height="30" src="https://img.icons8.com/officel/80/mate.png" alt="mate"/>
            </div>
            <div className="flex gap-5 ">
                <Link href={"/"}>Inicio</Link>
                <Link href={"/productos"}>Productos</Link>
                <Link href={""}>Nosotros</Link>

            </div>
            <div>
                <Search/>

            </div>
        </nav>
    </header>
    </>)
}