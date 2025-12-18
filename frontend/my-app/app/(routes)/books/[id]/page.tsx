import { getBooks, getBookById } from "@/features/books/services/bookService";
import BookDetailClient from "./BookDetailClient";

interface BookDetailPageProps {
  params: Promise<{ id: string }>; 
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  return <BookDetailClient book={book} />;
}