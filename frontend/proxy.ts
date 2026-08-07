import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
export function proxy(request:NextRequest){

    const token = request.cookies.get("token");

    if(!token){
            return NextResponse.redirect(new URL("/users/login", request.url))
    }
    


    return NextResponse.next()
}

export const config = {
  matcher: "/users/admin/:path*",
};
