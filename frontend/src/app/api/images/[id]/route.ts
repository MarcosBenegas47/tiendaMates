import { join } from 'path';
import { readdirSync } from 'fs';
import { FindImage } from '@/app/utility/findImage';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    if(id == null) return
    // Ruta a la imagen en tu directorio público
    const ruta = join(process.cwd(), 'src', 'resources','images');
    const file = readdirSync(ruta);
    const fileFind = file.find(file => file.startsWith(`${id}.`));
    let pathFile:string ="";
    if(fileFind){
      pathFile = join(ruta, fileFind);

    }

    return FindImage(pathFile);

}
