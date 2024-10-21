import { existsSync, readdirSync } from "fs";
import { NextResponse } from "next/server"
import { join } from "path";
export async function GET(req:Request, {params}:{params:{id:string}}) {
    const {id} = params;
   // console.log(id)

    const ruta = join(process.cwd(),'src', 'resources','images',id)
    if(!existsSync(ruta)){
        return NextResponse.json([])
    }
    const file = readdirSync(ruta)
    const fileFind = file.map(f=> f);
   // console.log(fileFind);
    try {

        return NextResponse.json( fileFind,{status:200} )
    } catch (error) {
        console.log(error)
        return new NextResponse('Error File not Found',{status:404})
    }
}