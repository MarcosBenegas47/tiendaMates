
export const imageList = async (id:string):Promise<string[]> =>{
    const response = await fetch(`/api/folder/imagesdirectory/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json() as Promise <string[]>;

}

