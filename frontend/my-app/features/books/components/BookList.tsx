import { getBooks, searchBooks } from '@/features/books/services/bookService';
import BookCard from './bookCard';
import { BookOpen, SearchX, Library } from 'lucide-react';

export default async function BookList({ query = '' }: { query?: string }) {
  const books = query ? await searchBooks(query) : await getBooks();

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-16 sm:py-24">
        <div className="max-w-md mx-auto">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto border border-gray-700">
              {query ? (
                <SearchX className="w-12 h-12 text-gray-500" />
              ) : (
                <Library className="w-12 h-12 text-gray-500" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-800 rounded-full border-4 border-black"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            {query ? 'No se encontraron resultados' : 'No hay libros disponibles'}
          </h3>
          
          <p className="text-gray-400 mb-8">
            {query 
              ? `No hay libros que coincidan con "${query}". Prueba con otras palabras clave.`
              : 'La biblioteca está vacía por el momento. Agrega nuevos libros para comenzar.'
            }
          </p>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-700 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Sugerencias:</p>
                <p className="text-xs text-gray-500">
                  {query 
                    ? 'Revisa la ortografía o intenta términos más generales'
                    : 'Usa el botón "Nuevo Libro" para agregar contenido'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Contador de resultados */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
            <span className="text-gray-400 text-sm">
              Mostrando <span className="text-white font-semibold">{books.length}</span> libros
              {query && (
                <span className="text-gray-500"> para &quot;{query}&quot;</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Grid de libros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}