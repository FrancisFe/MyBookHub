// app/categories/[id]/edit/page.tsx

import { getCategories, getCategoryById } from "@/features/categories/services/categoryService";
import EditCategoryClient from "./EditCategoryClient";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    id: category.id.toString(),
  }));
}

// Pre-carga los datos de la categoría en el servidor
export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const category = await getCategoryById(id);
  
  // Pasa los datos pre-cargados al Client Component
  return <EditCategoryClient initialData={{ ...category, books: [] }} categoryId={id} />;
}