// app/context/CartContext.tsx
"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookDTO } from "@/features/types/book";
import { Cart } from "@/features/types/cart";
import {
  addItemToCartAction,
  clearCartAction,
  removeItemFromCartAction,
  updateCartItemAction,
} from "@/features/cart/services/cartActions";
import { getCart } from "@/features/cart/services/cartService";

type CartContextType = {
  cart: Cart | null;
  items: Cart["items"];
  isLoading: boolean;
  addToCart: (book: BookDTO, type?: "Purchase" | "Rental") => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, userId }: { children: ReactNode; userId: string | null }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Cart>({
    queryKey: ["cart", userId],
    queryFn: getCart,
    staleTime: 0,
    enabled: !!userId,
  });

  const cart = data ?? null;
  const items = useMemo(() => cart?.items ?? [], [cart]);

  const totalItems = useMemo(
    () => cart?.items?.reduce((sum, it) => sum + (it.quantity ?? 0), 0) ?? 0,
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      typeof cart?.totalPrice === "number"
        ? cart.totalPrice
        : cart?.items?.reduce(
            (sum, it) => sum + (it.unitPrice ?? 0) * (it.quantity ?? 0),
            0
          ) ?? 0,
    [cart]
  );

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  };

  const addToCart = async (
    book: BookDTO,
    type: "Purchase" | "Rental" = "Purchase"
  ) => {
    const availableStock =
      type === "Purchase" ? book.stockPurchase : book.stockRental;
    const existingItem = items.find(
      (item) => item.bookId === book.id && item.type === type
    );
    const currentQuantity = existingItem?.quantity ?? 0;

    if (currentQuantity >= availableStock) {
      alert(
        `No hay más stock disponible para ${
          type === "Purchase" ? "compra" : "renta"
        }. Stock actual: ${availableStock}`
      );
      return;
    }

    const result = await addItemToCartAction({
      bookId: book.id,
      quantity: 1,
      type,
    });

    if (!result.success) {
      alert(result.message || "Error al agregar al carrito");
      return;
    }

    await invalidate();
  };

  const removeFromCart = async (itemId: string) => {
    const result = await removeItemFromCartAction(itemId);
    if (!result.success) {
      alert(result.message || "Error al eliminar del carrito");
      return;
    }
    await invalidate();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const item = items.find((i) => i.id === itemId);
    if (item) {
      const result = await updateCartItemAction(itemId, quantity);
      if (!result.success) {
        alert(result.message || "Error al actualizar cantidad");
        return;
      }
    }

    await invalidate();
  };

  const clearCart = async () => {
    const result = await clearCartAction();
    if (!result.success) {
      alert(result.message || "Error al vaciar el carrito");
      return;
    }
    await invalidate();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
