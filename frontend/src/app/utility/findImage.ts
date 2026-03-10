import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
export const FindImage = async (src:string)=>{
  
    try {
        const imagen = await fs.readFile(src)
        return new NextResponse(imagen,{
          headers:{
            'Content-Type': 'image/webp',
          }
        });
    } catch (error) {
      console.log(error)
        return new NextResponse('Image not Found',{status:404});
    }
}