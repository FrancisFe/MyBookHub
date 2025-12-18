// app/books/[id]/delete/page.tsx

import { getBooks, getBookById } from "@/features/books/services/bookService";
import DeleteBookClient from "./DeleteBookClient";

// ✅ generateStaticParams para generar todas las rutas
export async function generateStaticParams() {
  const books = await getBooks();
  
  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

// Server Component que pre-carga datos y renderiza el Client Component
export default async function DeleteBookPage({ params }: { params: { id: string } }) {
  const { id } = await params;
    
  const book = await getBookById(id);
  return <DeleteBookClient bookId={id} bookTitle={book.title} />;
}