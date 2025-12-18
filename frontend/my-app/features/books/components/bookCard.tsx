/* eslint-disable @next/next/no-img-element */
"use client";

import { BookDTO } from "@/features/types/book";
import { useCart } from "@/context/cartContex";
import { Edit3, ShoppingCart, Calendar, BookOpen,X, Eye } from "lucide-react";
import Link from "next/link";

interface BookCardProps {
  book: BookDTO;
  isAdmin: boolean;
}

export default function BookCard({ book, isAdmin }: BookCardProps) {
  const { addToCart } = useCart();
  
  // Lógica de stock por tipo
  const hasPurchaseStock = book.stockPurchase > 0;
  const hasRentalStock = book.stockRental > 0;
  const isCompletelyOutOfStock = !hasPurchaseStock && !hasRentalStock;

  return (
    <div className={`group bg-gray-800 border ${isCompletelyOutOfStock ? 'border-gray-700/50' : 'border-gray-700 hover:border-blue-500/30'} rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full`}>
      
      {/* Imagen del libro */}
      <div className="aspect-[3/4] bg-gray-900 relative overflow-hidden">
        {book.imageUrl ? (
          <img 
            src={book.imageUrl} 
            alt={book.title} 
            className={`object-cover w-full h-full transition-all duration-500 ${
              isCompletelyOutOfStock ? 'grayscale opacity-50' : 'group-hover:scale-105'
            }`} 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className={`w-12 h-12 ${isCompletelyOutOfStock ? 'text-gray-700' : 'text-gray-600'}`} />
          </div>
        )}
        
        {/* Overlay de stock */}
        {isCompletelyOutOfStock && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
            <div className="p-3 w-full bg-gray-900/90 backdrop-blur-sm">
              <div className="flex items-center gap-2 justify-center">
                <X className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-medium">Agotado</span>
              </div>
            </div>
          </div>
        )}

        {/* Botón de edición (admin) */}
        {isAdmin && (
          <Link 
            href={`/books/${book.id}/edit`}
            className="absolute top-3 right-3 p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Información del libro */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Título y autor */}
        <div className="mb-3">
          <Link href={`/books/${book.id}`}>
            <h3 className={`font-bold text-base mb-1 line-clamp-2 hover:text-blue-300 transition-colors ${isCompletelyOutOfStock ? 'text-gray-500' : 'text-white'}`}>
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-400 text-sm line-clamp-1">{book.authorName}</p>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Precio:</span>
            <span className={`font-bold ${isCompletelyOutOfStock ? 'text-gray-500' : 'text-blue-400'}`}>
              ${book.purchasePrice}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-400 text-sm">Renta/día:</span>
            <span className={`font-bold ${isCompletelyOutOfStock ? 'text-gray-500' : 'text-emerald-400'}`}>
              ${book.rentalPricePerDay}
            </span>
          </div>
        </div>

        {/* Indicadores de stock */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${hasPurchaseStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-300 text-xs">Compra:</span>
            </div>
            <span className={`text-xs ${hasPurchaseStock ? 'text-green-400' : 'text-red-400'}`}>
              {hasPurchaseStock ? `${book.stockPurchase} disponibles` : 'Agotado'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${hasRentalStock ? 'bg-blue-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-300 text-xs">Renta:</span>
            </div>
            <span className={`text-xs ${hasRentalStock ? 'text-blue-400' : 'text-red-400'}`}>
              {hasRentalStock ? `${book.stockRental} disponibles` : 'Agotado'}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => addToCart(book, "Purchase")}
            disabled={!hasPurchaseStock}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${
              hasPurchaseStock 
                ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasPurchaseStock ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar al carrito</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                <span>Sin stock</span>
              </>
            )}
          </button>

          <button
            onClick={() => addToCart(book, "Rental")}
            disabled={!hasRentalStock}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${
              hasRentalStock 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98]' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasRentalStock ? (
              <>
                <Calendar className="w-4 h-4" />
                <span>Rentar libro</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                <span>Sin stock</span>
              </>
            )}
          </button>
          <Link 
            href={`/books/${book.id}`}
            
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            
          >
            <Eye className="w-4 h-4" />
            <span>Ver Detalles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}