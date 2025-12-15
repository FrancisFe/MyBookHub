"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cartContex";

export function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="hidden sm:inline">Carrito</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
