// app/authors/[id]/edit/page.tsx

import { getAuthors, getAuthorById } from "@/features/author/services/authorService";
import EditAuthorClient from "./EditAuthorClient";

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    id: author.id.toString(),
  }));
}

// Pre-carga los datos del autor en el servidor
export default async function EditAuthorPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const author = await getAuthorById(id);
  
  // Pasa los datos pre-cargados al Client Component
  return <EditAuthorClient initialData={author} authorId={id} />;
}