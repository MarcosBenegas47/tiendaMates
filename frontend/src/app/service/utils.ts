
export const cleanOffset =  (ruta:string)=>{
        

    const fromProduct = sessionStorage.getItem("fromProduct");

    if (!fromProduct) {
        sessionStorage.removeItem("offset");
    }

    sessionStorage.removeItem("fromProduct");

}