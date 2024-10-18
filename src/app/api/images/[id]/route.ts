import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs } from 'fs';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    // Ruta a la imagen en tu directorio público
    const ruta = join(process.cwd(), 'src', 'resources','images', `${id}.jpg`);
  try {
    const imagen = await fs.readFile(ruta)
    return new NextResponse(imagen)
  } catch (error) {
    return new NextResponse('Image not Found',{status:404})
  } 
   
}
