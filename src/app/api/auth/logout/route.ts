import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function POST(req:NextRequest){
    const cookie = cookies().get("accessToken");
    if(!cookie){
        const status =401;
        return NextResponse.json({status, error:'no-token'})
    }
    try {
        verify(cookie.value, 'ClaveSecreta')
        cookies().delete('accessToken')
        const status =200;
        
    return NextResponse.json({status});
    } catch (error) {
        console.log(error)
        return NextResponse.json({status, error:'no-token'})
    }
    
}