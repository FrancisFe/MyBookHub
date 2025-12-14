import { getBooks } from '@/features/books/services/bookService';
import BookCard from './bookCard';

export default async function BookList() {
    const books = await getBooks();

    if (! books || books.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay libros disponibles</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  }