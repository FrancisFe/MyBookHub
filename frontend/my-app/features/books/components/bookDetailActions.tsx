"use client";

import { BookDTO } from "@/features/types/book";
import { AddToCartButton } from "@/features/carts/components/addToCartButton";
import { useCart } from "@/context/cartContex";

interface BookDetailActionsProps {
  book: BookDTO;
}

export function BookDetailActions({ book }: BookDetailActionsProps) {
  const { items } = useCart();

  // Calcular stock disponible considerando lo que ya está en el carrito
  const purchaseItemInCart = items.find(
    (item) => item.bookId === book.id && item.type === "Purchase"
  );
  const rentalItemInCart = items.find(
    (item) => item.bookId === book.id && item.type === "Rental"
  );

  const availablePurchaseStock = book.stockPurchase - (purchaseItemInCart?.quantity ?? 0);
  const availableRentalStock = book.stockRental - (rentalItemInCart?.quantity ?? 0);

  const hasPurchaseStock = availablePurchaseStock > 0;
  const hasRentalStock = availableRentalStock > 0;

  // Verificar si el usuario tiene TODO el stock en el carrito
  const hasAllPurchaseStock = purchaseItemInCart && purchaseItemInCart.quantity >= book.stockPurchase;
  const hasAllRentalStock = rentalItemInCart && rentalItemInCart.quantity >= book.stockRental;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        {hasPurchaseStock && (
          <AddToCartButton book={book} type="Purchase" label="Comprar" />
        )}
        {hasRentalStock && (
          <AddToCartButton book={book} type="Rental" label="Rentar por día" />
        )}
        {!hasPurchaseStock && hasAllPurchaseStock && (
          <p className="text-sm text-gray-500 italic">
            Ya tienes todo el stock de compra en tu carrito ({purchaseItemInCart.quantity} de {book.stockPurchase})
          </p>
        )}
        {!hasRentalStock && hasAllRentalStock && (
          <p className="text-sm text-gray-500 italic">
            Ya tienes todo el stock de renta en tu carrito ({rentalItemInCart.quantity} de {book.stockRental})
          </p>
        )}
      </div>

      {/* Disponibilidad actualizada dinámicamente */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xs mb-2">Stock compra disponible</p>
          <div className={`inline-flex items-center gap-2 ${
            availablePurchaseStock > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              availablePurchaseStock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            <span className="font-semibold">
              {availablePurchaseStock > 0 ? `${availablePurchaseStock} disponibles` : 'Agotado'}
            </span>
          </div>
          {purchaseItemInCart && (
            <p className="text-gray-500 text-xs mt-1">
              ({purchaseItemInCart.quantity} en tu carrito)
            </p>
          )}
        </div>

        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xs mb-2">Stock renta disponible</p>
          <div className={`inline-flex items-center gap-2 ${
            availableRentalStock > 0 ? 'text-blue-400' : 'text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              availableRentalStock > 0 ? 'bg-blue-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            <span className="font-semibold">
              {availableRentalStock > 0 ? `${availableRentalStock} disponibles` : 'Agotado'}
            </span>
          </div>
          {rentalItemInCart && (
            <p className="text-gray-500 text-xs mt-1">
              ({rentalItemInCart.quantity} en tu carrito)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
