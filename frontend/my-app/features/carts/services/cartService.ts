"use server";
import { Cart } from "@/features/types/cart";
import { getApiUrl } from "@/features/utils/baseURL";

import { getAuthToken } from "@/lib/auth";

const url = getApiUrl('/api/cart');

/**
 * Obtener el carrito del usuario actual
 */
export const getCart = async (): Promise<Cart> => {
  const token = await getAuthToken();
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 }, // No cachear carrito
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

/**
 * Obtener cantidad de items en el carrito
 */
export const getCartItemCount = async (): Promise<number> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/item-count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

/**
 * Obtener total del carrito
 */
export const getCartTotal = async (): Promise<number> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};