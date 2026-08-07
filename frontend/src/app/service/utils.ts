
export const cleanOffset =  (ruta:string)=>{
        

    const fromProduct = sessionStorage.getItem("fromProduct");

    if (!fromProduct) {
        sessionStorage.removeItem("offset");
    }

    sessionStorage.removeItem("fromProduct");

}


export const buildQuery =(id:number[] | []=[] , offset:number = 0) => {
    const params: string[] = []
    if(id && id.length >0){
        params.push(`id=[${id.join(",")}]`)
    }
    if(offset != undefined && offset !=0){
        params.push(`offset=${offset}`)
    }
    return params.length?  `?${params.join("&")}`:""
}