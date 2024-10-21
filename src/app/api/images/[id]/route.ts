import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs, readdirSync } from 'fs';
import { FindImage } from '@/app/utility/findImage';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    // Ruta a la imagen en tu directorio público
    const ruta = join(process.cwd(), 'src', 'resources','images');
    const file = readdirSync(ruta);
    const fileFind = file.find(file => file.startsWith(`${id}.`));
    var pathFile:string ="";
    if(fileFind){
      pathFile = join(ruta, fileFind);

    }

    return FindImage(pathFile);

}
