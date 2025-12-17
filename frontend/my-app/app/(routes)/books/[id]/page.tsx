/* eslint-disable @next/next/no-img-element */

import { getBookById } from "@/features/books/services/bookService";
import { isUserAdmin } from "@/features/auth/services/authService";
import Link from "next/link";
import { BookDetailActions } from "@/features/books/components/bookDetailActions";
import { ArrowLeft, BookOpen, Tag, User, Bookmark, Edit, Trash2, ShoppingCart } from "lucide-react";

interface BookDetailPageProps {
  params: Promise<{ id: string }>; 
}

export async function generateStaticParams() {
  return []; 
}
export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = await getBookById(id);
  const userAdmin = await isUserAdmin();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header con navegación */}
      <div className="mb-8">
        <Link 
          href="/books" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver a la biblioteca</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Columna izquierda - Imagen y acciones admin */}
        <div className="lg:col-span-1 space-y-6">
          {/* Imagen del libro */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 p-4">
            {book.imageUrl ? (
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
              </div>
            ) : (
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-gray-500" />
              </div>
            )}
          </div>

          {/* Acciones de administrador */}
          {userAdmin && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-400" />
                Administración
              </h3>
              <div className="space-y-3">
                <Link
                  href={`/books/${book.id}/edit`}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-600/20 to-yellow-700/10 hover:from-yellow-600 hover:to-yellow-700 text-yellow-400 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-yellow-800/30 hover:border-yellow-600 group"
                >
                  <Edit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Editar Libro
                </Link>
                <Link
                  href={`/books/${book.id}/delete`}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600/20 to-red-700/10 hover:from-red-600 hover:to-red-700 text-red-400 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-red-800/30 hover:border-red-600 group"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Eliminar Libro
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha - Información del libro */}
        <div className="lg:col-span-2 space-y-8">
          {/* Título y autor */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {book.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-lg">
                  {typeof book.author === "string"
                    ? book.author
                    : book.author.fullName}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Tag className="w-4 h-4" />
                <span>
                  {typeof book.category === "string"
                    ? book.category
                    : book.category.name}
                </span>
              </div>
              
              <div className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-gray-700">
                <span className="text-sm text-gray-400">ISBN: {book.isbn}</span>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Descripción</h2>
              <p className="text-gray-300 leading-relaxed">
                {book.description || "Sin descripción disponible"}
              </p>
            </div>
          </div>

          {/* Precios y stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Precio de compra */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Compra</h3>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Precio</p>
                <p className="text-3xl font-bold text-white">${book.purchasePrice}</p>
              </div>
            </div>

            {/* Precio de renta */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Renta</h3>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Precio por día</p>
                <p className="text-3xl font-bold text-white">${book.rentalPricePerDay}</p>
              </div>
            </div>
          </div>

          {/* Botones de acciones */}
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold text-white">Agregar al carrito</h3>
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Ver Carrito</span>
              </Link>
            </div>
            <BookDetailActions book={book} />
          </div>

          {/* Información adicional */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4">
              <p className="text-gray-400 text-sm mb-1">ID del Libro</p>
              <p className="text-gray-300 font-mono text-sm truncate">{book.id}</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4">
              <p className="text-gray-400 text-sm mb-1">Fecha de publicación</p>
              <p className="text-gray-300">{book.publishedDate ? book.publishedDate.split('T')[0] : 'No disponible'}</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4">
              <p className="text-gray-400 text-sm mb-1">Estado</p>
              <p className="text-green-400 font-medium">Disponible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}