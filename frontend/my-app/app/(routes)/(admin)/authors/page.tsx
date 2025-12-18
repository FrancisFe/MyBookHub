"use client";

import { getAuthors } from "@/features/author/services/authorService";
import { PlusCircle, User, BookOpen, Users, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/auth";
import { AuthorDTO } from "@/features/types/author";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [userAdmin, setUserAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const isUserAdmin = isAdmin();
      setUserAdmin(isUserAdmin);
      const data = await getAuthors();
      setAuthors(data);
      setMounted(true);
      setLoading(false);
    };
    checkAdminAndFetch();
  }, []);

  if (!mounted || loading) return null;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-gray-700">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Autores
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  {authors.length} autores en la biblioteca
                </p>
              </div>
            </div>

            {userAdmin && (
              <Link
                href="/authors/new"
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] w-fit"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Nuevo Autor</span>
              </Link>
            )}
          </div>

        </div>

        {/* Grid de autores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <Link
                href={`/authors/${author.id}`}
                className="flex-1 p-6 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {author.fullName}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <BookOpen className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-400 text-xs">
                        ID: {author.id}
                      </span>
                    </div>
                  </div>
                </div>

                {author.biography ? (
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {author.biography}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm italic mb-4">
                    Sin biografía disponible
                  </p>
                )}

                {/* Info adicional */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Ver detalles</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>

              {/* Botón de búsqueda */}
              <div className="px-6 py-3 border-t border-gray-700 bg-gray-800/30">
                <Link
                  href={`/books?query=${encodeURIComponent(author.lastName)}`}
                  className="flex items-center justify-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Buscar en libros
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay autores */}
        {authors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No hay autores registrados
            </h3>
            <p className="text-gray-400 mb-6">
              Comienza agregando el primer autor a la biblioteca
            </p>
            <Link
              href="authors/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              <PlusCircle className="w-5 h-5" />
              Agregar primer autor
            </Link>
          </div>
        )}

        {/* Stats footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Total: {authors.length} autores</span>
            </div>
            <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Biblioteca completa</span>
            </div>
            <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Gestión activa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}