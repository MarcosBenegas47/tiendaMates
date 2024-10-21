import path, { join } from "path";
import sharp from "sharp";
// import { promises as fs } from 'fs';
import fs from "fs"; // Usar fs sin .promises
import { Console } from "console";
const extensionToConvert = ['.png', '.jpg'];


console.log("desde script");




const convertToWebp= async(filePath)=>{
    try {
        const image = sharp(filePath);
        const imageInfo= path.parse(filePath)
        const outputFilePath = path.join(imageInfo.dir,`${imageInfo.name}.webp`);
        await image.toFile(outputFilePath);
     //   console.log(`${inputFilePath} convertido a ${outputFilePath}`)

    } catch (error) {
        console.error(`Error al convertir ${filePath} a webp:`, error);
        throw error;
    }
}


const deleteFile =  (filePath)=>{
   return new Promise( (resolve, reject) =>{
        fs.unlink(filePath,(err)=>{
            if (err) {
                console.error(`Error al eliminar el archivo original: ${filePath}`, err);
                reject(err);
              } else {
                console.log(`Archivo original eliminado: ${filePath}`);
                resolve();
              }
        })
    })
}
const searchFile = async (ruta)=>{
    fs.readdir(ruta, (err,file)=>{
      //  console.log(ruta)
    
        if(err){
            console.log(err); 
            return;}
    
        file.forEach((file) => {
            const filePath = path.join(ruta,file)
           // console.log(filePath)
            fs.stat(filePath,async (statErr, stat)=>{
                if (statErr) {
                    console.error('Error al leer el fichero:', statErr);
                    return;
                  }
                if(stat.isDirectory()){
                    searchFile(filePath)
                }else{
                    const fileExtension = path.extname(file).toLowerCase()
                    if(extensionToConvert.includes(fileExtension)){
                      //  console.log("llegue aca")
                      try {
                        await convertToWebp(filePath)
                        console.log(filePath);
                        await deleteFile(filePath)
                      } catch (error) {
                        console.error(`Error procesando ${filePath}:`, error);
                    }
                        
                    }
                    
                }
            })
        });
    })
    

} 
const ruta = join(process.cwd(), 'src', 'resources','images');

searchFile(ruta)


