// app/authors/[id]/delete/page.tsx

import { getAuthors, getAuthorById } from "@/features/author/services/authorService";
import DeleteAuthorClient from "./DeleteAuthorClient";

// ✅ generateStaticParams para generar todas las rutas
export async function generateStaticParams() {
  const authors = await getAuthors();
  
  return authors.map((author) => ({
    id: author.id.toString(),
  }));
}

// Server Component que pre-carga datos y renderiza el Client Component
export default async function DeleteAuthorPage({ params }: { params: { id: string } }) {
  const { id } = await params;
    
  const author = await getAuthorById(id);
  return <DeleteAuthorClient authorId={id} authorName={author.fullName} />;
}