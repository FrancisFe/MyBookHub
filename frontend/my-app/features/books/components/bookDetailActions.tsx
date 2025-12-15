"use client";

import { BookDTO } from "@/features/types/book";
import { AddToCartButton } from "@/features/cart/components/addToCartButton";
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
    <div className="flex gap-3 flex-wrap rounded-lg">
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
  );
}
