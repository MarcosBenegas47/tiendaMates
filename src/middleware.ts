import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest){
    console.log(req.nextUrl.pathname)
    const cookie= req.cookies.get('accessToken')?.value;   
        if(cookie=== undefined){
            console.log("no hay cookie")
            return NextResponse.redirect(new URL('/administracion/login', req.url));

        } 
        try {
            jwtVerify(cookie, new TextEncoder().encode("ClaveSecreta"))
            
            return NextResponse.next();
        } catch (error) {
            console.log("error en la cookie"+error)
            return NextResponse.redirect(new URL('/administracion/login', req.url));
        }
        
}
export const config ={
    matcher:['/dashboard/admin','/dashboard/crear','/dashboard/editar/:path*']
}