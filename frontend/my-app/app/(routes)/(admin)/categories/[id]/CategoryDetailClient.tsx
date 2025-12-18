/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Category } from "@/features/types/category";
import { useRouter } from "next/navigation";
import { Tag, FileText, BookOpen, ArrowLeft, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/auth";

interface CategoryDetailClientProps {
  category: Category;
}

export default function CategoryDetailClient({ category }: CategoryDetailClientProps) {
  const router = useRouter();
  const [userAdmin, setUserAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUserAdmin(isAdmin());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header con navegación */}
        <div className="mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Categorías
          </Link>
        </div>

        {/* Tarjeta principal de la categoría */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full flex items-center justify-center border border-gray-700">
              <Tag className="w-12 h-12 text-blue-400" />
            </div>
            
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {category.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Categoría registrada</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">ID: {category.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          {category.description ? (
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Descripción</h2>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {category.description}
              </p>
            </div>
          ) : (
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-center italic">
                No hay descripción disponible para esta categoría
              </p>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Nombre</p>
            <p className="text-white font-medium">{category.name}</p>
          </div>
          
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">ID</p>
            <p className="text-white font-mono text-sm">{category.id}</p>
          </div>
          
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Estado</p>
            <p className="text-green-400 font-medium">Activa</p>
          </div>
        </div>

        {/* Botón de búsqueda por categoría */}
        <div className="mb-8">
          <Link
            href={`/books?query=${encodeURIComponent(category.name)}`}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            <Search className="w-4 h-4" />
            Ver libros de esta categoría
          </Link>
        </div>

        {/* Acciones */}
        {userAdmin && (
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Acciones</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/categories/${category.id}/edit`}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                <Edit className="w-4 h-4" />
                Editar Categoría
              </Link>
              <Link
                href={`/categories/${category.id}/delete`}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar Categoría
              </Link>
            </div>
          </div>
        )}

        {/* Nota */}
        <div className="mt-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Las categorías organizan y clasifican los libros en la biblioteca
          </p>
        </div>
      </div>
    </div>
  );
}
