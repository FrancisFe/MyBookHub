import BookList from "@/features/books/components/bookList";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import Search from "@/app/ui/search";
import { BookOpen, PlusCircle } from "lucide-react";
import { isUserAdmin } from "@/features/auth/services/authService";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const userAdmin = await isUserAdmin();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-gray-700">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Biblioteca Digital
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Explora nuestra colección de libros
              </p>
            </div>
          </div>
          {userAdmin && (<Link 
            href="/books/new" 
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-fit"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Nuevo Libro</span>
          </Link>)}
          
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search placeholder="Buscar libros por título, autor o categoría..." />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-3 text-center">
            {query ? `Buscando: "${query}"` : 'Escribe para buscar en nuestro catálogo'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/5 to-transparent"></div>
        <Suspense fallback={<Loading />}>
          <BookList query={query} />
        </Suspense>
      </div>

      
    </div>
  );
}