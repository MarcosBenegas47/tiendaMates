import { getProduct } from "@/app/service/getProduct";
import { Package } from "lucide-react";
import Link from "next/link";

export default async function Page(){
    
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
            <div>
                
            </div>
        </section>
    </>)
}