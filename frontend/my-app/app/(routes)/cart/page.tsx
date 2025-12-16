// app/cart/page.tsx
"use client";

import { useCart } from "@/context/cartContex";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/features/books/services/bookService";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import AddToOrderButton from "@/features/orders/components/addToOrderButton";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const { data: books = [], isLoading: isLoadingBooks } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const getBookTitle = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    return book?.title || `Libro ${bookId}`;
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const book = books.find((b) => b.id === item.bookId);
    if (!book) return;

    const maxStock =
      item.type === "Purchase" ? book.stockPurchase : book.stockRental;

    if (newQuantity > maxStock || newQuantity < 1) return;

    updateQuantity(itemId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gray-800 rounded-full border-4 border-black"></div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Explorá nuestro catálogo y descubrí libros increíbles para agregar a tu colección.
        </p>
        <Link
          href="/books"
          className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Explorar Libros
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl">
          <ShoppingCart className="w-6 h-6 text-blue-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Carrito de Compras
        </h1>
        <span className="ml-4 px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium">
          {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
        </span>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => {
          const book = books.find((b) => b.id === item.bookId);
          const maxStock = book
            ? item.type === "Purchase"
              ? book.stockPurchase
              : book.stockRental
            : 0;

          const isMaxStock = item.quantity >= maxStock;

          return (
            <div
              key={item.id}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {isLoadingBooks ? (
                          <span className="inline-block h-5 w-40 bg-gray-700 animate-pulse rounded"></span>
                        ) : (
                          getBookTitle(item.bookId)
                        )}
                      </h2>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                            item.type === "Purchase"
                              ? "bg-gradient-to-r from-green-900/30 to-green-800/20 text-green-400 border border-green-800/30"
                              : "bg-gradient-to-r from-blue-900/30 to-blue-800/20 text-blue-400 border border-blue-800/30"
                          }`}
                        >
                          {item.type === "Purchase" ? "Compra" : "Renta"}
                        </span>
                        <span className="text-sm text-gray-400">
                          Stock: {maxStock}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="flex items-center justify-between lg:justify-center lg:w-48">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Minus className="w-4 h-4 mx-auto" />
                    </button>

                    <div className="min-w-[60px] px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                      <span className="text-center font-bold text-white block">
                        {item.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={isMaxStock}
                      className={`w-10 h-10 rounded-full text-lg font-bold transition-all duration-200 ${
                        isMaxStock
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-gray-700 hover:bg-gray-600 text-white hover:scale-105 active:scale-95 cursor-pointer"
                      }`}
                    >
                      <Plus className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end lg:w-64 gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">
                      ${item.unitPrice.toFixed(2)} c/u
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-all duration-200 group/remove cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5 group-hover/remove:scale-110 transition-transform " />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-5 py-3 text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-xl font-medium transition-all duration-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Vaciar carrito
            </button>
            
            <Link
              href="/books"
              className="flex items-center gap-2 px-5 py-3 text-gray-400 hover:text-blue-400 hover:bg-blue-900/10 rounded-xl font-medium transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Seguir comprando
            </Link>
          </div>

          <div className="text-right">
            <div className="mb-6">
              <p className="text-gray-400 mb-2">Total del carrito</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ${totalPrice.toFixed(2)}
              </p>
              
            </div>
            
          
              <span className="flex items-center justify-center gap-3">
                <AddToOrderButton />
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
          </div>
        </div>
      </div>
    </div>
  );
}