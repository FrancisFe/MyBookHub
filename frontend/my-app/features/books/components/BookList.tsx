/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useQuery } from '@tanstack/react-query';
import { getBooks, searchBooks } from '@/features/books/services/bookService';
import BookCard from './bookCard';
import { SearchX, Library} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function BookList({ query = '' }: { query?: string }) {
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  // Detectar admin en el cliente
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserIsAdmin(role === "ADMIN");
  }, []);

  // Usamos React Query para obtener los libros
  const { data: books, isLoading } = useQuery({
    queryKey: ['books', query],
    queryFn: () => (query ? searchBooks(query) : getBooks()),
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
            </div>
          </div>
          <p className="mt-6 text-gray-400">Cargando biblioteca...</p>
        </div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
              {query ? (
                <SearchX className="w-10 h-10 text-gray-500" />
              ) : (
                <Library className="w-10 h-10 text-gray-500" />
              )}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3">
            {query ? 'No se encontraron resultados' : 'No hay libros disponibles'}
          </h3>
          
          <p className="text-gray-400 mb-6">
            {query 
              ? `No hay libros que coincidan con "${query}"`
              : 'La biblioteca está vacía por el momento.'}
          </p>
          
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
            <p className="text-gray-500 text-sm">
              {query 
                ? 'Intenta con otros términos de búsqueda'
                : 'Agrega nuevos libros para comenzar'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Contador de resultados */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-gray-300 text-sm">
            <span className="text-white font-medium">{books.length}</span> libro{books.length !== 1 ? 's' : ''} encontrado{books.length !== 1 ? 's' : ''}
            {query && <span className="text-gray-500"> para &quot;{query}&quot;</span>}
          </span>
        </div>
      </div>

      {/* Grid de libros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} isAdmin={userIsAdmin} />
        ))}
      </div>

      {/* Footer informativo */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-4 py-2 bg-gray-800/30 rounded-lg">
            <span className="text-gray-400 text-sm">Colección completa</span>
          </div>
          <div className="px-4 py-2 bg-gray-800/30 rounded-lg">
            <span className="text-gray-400 text-sm">Disponibilidad en tiempo real</span>
          </div>
          {userIsAdmin && (
            <div className="px-4 py-2 bg-blue-900/20 rounded-lg border border-blue-800/30">
              <span className="text-blue-400 text-sm">Modo administrador</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}