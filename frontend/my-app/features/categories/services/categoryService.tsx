import { env } from "@/config/env";
import { CategoryDTO } from "@/features/types/category";



const url = `${env.NEXT_PUBLIC_BACKEND_API_URL}/api/category`;

export const getCategories = async (): Promise<CategoryDTO[]> => {
    try{
        const response = await fetch(url,{
            method: "GET",
            headers:{
                "Content-Type":"application/json",
            },
            next: {revalidate: 0, tags: ['categories']},
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
            next: {revalidate: 0, tags: ['categories', `category-${id}`]},
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