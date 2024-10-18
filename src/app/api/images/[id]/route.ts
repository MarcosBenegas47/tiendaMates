import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs, readdirSync } from 'fs';

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
  try {
    const imagen = await fs.readFile(pathFile)
    return new NextResponse(imagen)
  } catch (error) {
    return new NextResponse('Image not Found',{status:404})
  } 
   
}
