
export const imageList = async (id:string):Promise<string[]> =>{
    const response = await fetch(`/api/folder/imagesdirectory/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json() as Promise <string[]>;

}

export const loginAuth = async (email:string, password:string)=>{
    const repsonse = await fetch("/api/auth/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
    window.location.href = "/dashboard/admin";
    if(!repsonse.ok){
        console.log("solicitud enviada");
    }
    
}
export const logoutAuth = async ()=>{
    const repsonse = await fetch("/api/auth/logout",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({}),
    });
    if(!repsonse.ok){
        console.log("solicitud enviada");
    }
    window.location.href = "/";
}