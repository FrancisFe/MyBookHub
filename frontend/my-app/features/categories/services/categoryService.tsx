
import { CategoryDTO } from "@/features/types/category";
import { getApiUrl } from "@/features/utils/baseURL";



const url = getApiUrl('/api/category');

export const getCategories = async (): Promise<CategoryDTO[]> => {
    try{
        const response = await fetch(url,{
            method: "GET",
            headers:{
                "Content-Type":"application/json",
            },
        });
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }   catch(error){
        console.error("❌ Error fetching categories:", error);
        throw error;
    }
}

export const getCategoryById = async (id:string):Promise<CategoryDTO> =>{
    try{
        const response = await fetch(`${url}/${id}`,{
            method: "GET",
            headers:{
                "Content-Type":"application/json",
            },
        });
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }   catch(error){
        console.error("❌ Error fetching category by id:", error);
        throw error;
    }
}