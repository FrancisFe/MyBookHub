"use client";

import { BookDTO } from "@/features/types/book";
import { useCart } from "@/context/cartContex";

interface AddToCartButtonProps {
  book: BookDTO;
  type?: "Purchase" | "Rental";
  label?: string;
}

export function AddToCartButton({ book, type = "Purchase", label }: AddToCartButtonProps) {
  const { addToCart, items } = useCart();
  const cartItem = items.find((item) => item.bookId === book.id && item.type === type);

  const buttonLabel = label
    ? label
    : cartItem
      ? `Agregar otro (${cartItem.quantity})`
      : type === "Rental"
        ? "Rentar"
        : "Agregar al carrito";

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={async () => {
          await addToCart(book, type);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer "
      >
        {buttonLabel}
      </button>
      
      {cartItem && (
        <span className="text-sm text-gray-600">
          {cartItem.quantity} en el carrito
        </span>
      )}
    </div>
  );
}