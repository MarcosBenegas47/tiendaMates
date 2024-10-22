import path, { join } from "path";
// import { promises as fs } from 'fs';
import fs from "fs"; // Usar fs sin .promises

const data ={
    0:899,
    1:1839,
    10:913,
    11:1703,
    12:1126,
    13:966,
    14:2066,
    15:1605,
    16:1606,
    17:1607,
    18:1321,
    19:1210,
    2:1779,
    20:1210,
    21:1206,
    22:731,
    23:1801,
    24:1858,
    25:9979,
    26:3840,
    27:1954,
    28:3101,
    29:581,
    3:919,
    30:480,
    31:4204,
    32:2014,
    33:2067,
    34:481,
    35:2716,
    36:2132,
    37:5122,
    38:3033,
    39:3023,
    4:947,
    40:2714,
    41:1608,
    5:1403,
    6:184,
    7:512,
    8:696,
    9:2028,

}

const renameImage = async(ruta)=>{
// console.log(data[0]);
    fs.readdir(ruta,(err, file)=>{
        if(err){
            console.log(err)
            return;
        }
        const webpFiles = file.filter(file => path.extname(file) === '.webp')
        webpFiles.forEach((file,index) => {
            const oldpath = path.join(ruta, file);
            const newName = data[index]
            if(newName !== undefined){
                const newPath = path.join(ruta,`${newName}.webp` )
                fs.rename(oldpath,newPath,(err) =>{
                    if (err) {
                        console.error(`Error al renombrar el archivo ${file}:`, err);
                    } else {
                        console.log(`Renombrado: ${file} a ${newName}.webp`);
                    }
                })
            }else {
                console.log(`No se encontró un nuevo nombre para el archivo ${file}, se omitirá.`);
            }
        })

        
    })
}


const ruta = join(process.cwd(), 'src', 'resources','images');
renameImage(ruta)