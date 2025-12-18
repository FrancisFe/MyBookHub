// app/books/[id]/edit/page.tsx

import { getBooks, getBookById } from "@/features/books/services/bookService";
import EditBookClient from "./EditBookClient";

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

// Pre-carga los datos del libro en el servidor
export default async function EditBookPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const book = await getBookById(id);
  
  // Pasa los datos pre-cargados al Client Component
  return <EditBookClient initialData={book} bookId={id} />;
}
    