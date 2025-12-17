
"use client";

import { createContext, useContext, ReactNode, useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookDTO } from "@/features/types/book";
import { Cart } from "@/features/types/cart";
import {
  addItemToCartAction,
  clearCartAction,
  removeItemFromCartAction,
  updateCartItemAction,
} from "@/features/carts/services/cartActions";
import { getCart } from "@/features/carts/services/cartService";

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

export function CartProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  // 1. EFECTO: Sincronización con LocalStorage y eventos de Auth
  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem("userId");
      setUserId(storedUser);
      // Si el usuario se desloguea, limpiamos la caché del carrito inmediatamente
      if (!storedUser) {
        queryClient.setQueryData(["cart", null], null);
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    };

    // Verificación inicial
    handleAuthChange();

    // Escuchar el evento 'storage' para reaccionar al Login/Logout en tiempo real
    window.addEventListener("storage", handleAuthChange);
    return () => window.removeEventListener("storage", handleAuthChange);
  }, [queryClient]);

  // 2. QUERY: Solo se habilita si hay userId y estamos en el cliente
  const { data, isLoading } = useQuery<Cart>({
    queryKey: ["cart", userId],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché para evitar spam de peticiones
    enabled: !!userId && typeof window !== "undefined",
    retry: false, // No reintentar si da 401
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
    if (!userId) {
      alert("Debes iniciar sesión para agregar productos");
      return;
    }

    const availableStock = type === "Purchase" ? book.stockPurchase : book.stockRental;
    const existingItem = items.find((item) => item.bookId === book.id && item.type === type);
    const currentQuantity = existingItem?.quantity ?? 0;

    if (currentQuantity >= availableStock) {
      alert(`No hay más stock disponible. Máximo: ${availableStock}`);
      return;
    }

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
        const result = await addItemToCartAction({
          bookId: book.id,
          quantity: 1,
          type,
          ...(type === "Rental" && {
            rentalStartDate: today.toISOString().split('T')[0],
            rentalEndDate: tomorrow.toISOString().split('T')[0],
          }),
        });
    
        if (!result.success) {
          alert(result.message || "Error al agregar al carrito");
          return;
        }
    
        await invalidate();
    } catch (error) {
        console.error("Error en addToCart:", error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    const result = await removeItemFromCartAction(itemId);
    if (result.success) await invalidate();
    else alert(result.message);
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    const result = await updateCartItemAction(itemId, quantity);
    if (result.success) await invalidate();
  };

  const clearCart = async () => {
    const result = await clearCartAction();
    if (result.success) await invalidate();
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