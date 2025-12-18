// app/categories/[id]/delete/page.tsx

import { getCategories, getCategoryById } from "@/features/categories/services/categoryService";
import DeleteCategoryClient from "./DeleteCategoryClient";

// ✅ generateStaticParams para generar todas las rutas
export async function generateStaticParams() {
  const categories = await getCategories();
  
  return categories.map((category) => ({
    id: category.id.toString(),
  }));
}

// Server Component que pre-carga datos y renderiza el Client Component
export default async function DeleteCategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
    
  const category = await getCategoryById(id);
  return <DeleteCategoryClient categoryId={id} categoryName={category.name} />;
}