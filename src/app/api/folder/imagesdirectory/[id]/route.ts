import { existsSync, readdirSync } from "fs";
import { NextResponse } from "next/server"
import { join } from "path";
export async function GET(req:Request, {params}:{params:{id:string}}) {
    
    const {id} = params;
    const ruta = join(process.cwd(),'src', 'resources','images',String(id));
    if(!existsSync(ruta)){
        return NextResponse.json([]);
    }
    const file = readdirSync(ruta);

    try {
        return NextResponse.json( file,{status:200} );
    } catch (error) {
        console.log(error);
        return new NextResponse('Error File not Found',{status:404});
    }
}