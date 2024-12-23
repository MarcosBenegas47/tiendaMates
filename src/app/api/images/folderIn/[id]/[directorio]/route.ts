import { FindImage } from "@/app/utility/findImage";

import { join } from "path";

export async function GET(req:Request, {params}:{params:{id:string,directorio:string}}) {
    const {id, directorio} = params;
    const ruta = join(process.cwd(),'src', 'resources','images',id);
    //const file = readdirSync(ruta);
    //const fileFind = file.find(file => file.search(`${directorio}`));
    let pathFile:string ="";

    if(ruta){
        pathFile = join(ruta, directorio);
  
    }
   // console.log(pathFile)
    return FindImage(pathFile);
}