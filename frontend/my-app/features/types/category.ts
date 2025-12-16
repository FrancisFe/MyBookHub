import { Book } from "./book";

export interface Category{
    id:string;
    name:string;
    description?:string;
    books: Book[];
}

export interface CategoryDTO{
    id:string;
    name:string;
    description?:string;
}

export interface CreateCategoryDTO{
    name:string;
    description?:string;
}

export interface UpdateCategoryDTO{
    name:string;
    description?:string;
}