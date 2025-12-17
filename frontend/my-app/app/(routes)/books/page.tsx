/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import BookList from "@/features/books/components/BookList";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import Loading from "./loading";
import Search from "@/app/ui/search";
import { BookOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { isAdmin } from "@/lib/auth";

export default function BooksPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  
  const [userAdmin, setUserAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserAdmin(isAdmin());
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Libros
                </h1>
                <p className="text-gray-400 text-sm">
                  Explora nuestra colección de libros
                </p>
              </div>
            </div>

            {userAdmin && (
              <Link 
                href="/books/new" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Nuevo Libro
              </Link>
            )}
          </div>

          <div className="max-w-xl">
            <Search placeholder="Buscar libros por título, autor o categoría..." />
          </div>
        </div>

        <div className="relative">
          <Suspense key={query} fallback={<Loading />}>
            <BookList query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}