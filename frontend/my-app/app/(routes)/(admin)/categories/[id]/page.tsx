import { getCategories, getCategoryById } from "@/features/categories/services/categoryService";
import CategoryDetailClient from "./CategoryDetailClient";
import { Category } from "@/features/types/category";

interface CategoryDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    id: category.id.toString(),
  }));
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  return <CategoryDetailClient category={category as Category} />;
}