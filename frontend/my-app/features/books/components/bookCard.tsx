/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import { BookDTO } from '@/features/types/book';
import { ShoppingBag, Calendar, Tag, User, Eye, Edit, AlertCircle } from 'lucide-react';

interface BookCardProps {
  book: BookDTO;
  isAdmin?: boolean;
}

export default function BookCard({ book, isAdmin = false }: BookCardProps) {
  // Verificar si el libro tiene stock disponible
  const hasStock = book.stockPurchase > 0 || book.stockRental > 0;
  
  // Si no tiene stock y el usuario no es admin, no mostrar el libro
  if (!hasStock && !isAdmin) {
    return null;
  }

  // Clases de opacidad si no tiene stock
  const opacityClass = !hasStock ? "opacity-50" : "";
  
  return (
    <div className={`group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl ${opacityClass}`}>
      {/* Badge de sin stock (solo para admin) */}
      {!hasStock && isAdmin && (
        <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Sin Stock
        </div>
      )}
      
      {/* Imagen del libro */}
      {book.imageUrl ? (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={book.imageUrl} 
            alt={book.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-16 bg-gray-600 rounded mx-auto mb-2"></div>
            <p className="text-gray-400 text-sm">Sin imagen</p>
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Título */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {book.title}
        </h3>

        {/* Información del libro */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <p className="text-gray-300 text-sm">{book.authorName}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <p className="text-gray-400 text-xs">{book.categoryName}</p>
          </div>
        </div>

        {/* Precios y Stock - SIMPLIFICADO */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className="w-4 h-4 text-green-400" />
              <p className="text-gray-400 text-xs">Compra</p>
            </div>
            <p className="font-bold text-lg text-white">${book.purchasePrice}</p>
            <p className="text-xs text-gray-400 mt-1">
              Stock: {book.stockPurchase}
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-400" />
              <p className="text-gray-400 text-xs">Renta/día</p>
            </div>
            <p className="font-bold text-lg text-white">${book.rentalPricePerDay}</p>
            <p className="text-xs text-gray-400 mt-1">
              Stock: {book.stockRental}
            </p>
          </div>
        </div>

        {/* Botones - CON BOTÓN DE DETALLES */}
        <div className="flex gap-2">
          <Link 
            href={`/books/${book.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Detalles</span>
          </Link>
          {}
          <Link 
            href={`/books/${book.id}/edit`}
            className="px-4 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 py-3 rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
          >
            <Edit className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}