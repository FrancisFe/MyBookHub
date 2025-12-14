/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { AddToCartDTO } from "@/features/types/cartItems";
import { Cart } from "@/features/types/cart";
import { revalidatePath } from "next/cache";
import { env } from "@/config/env";
import { getAuthToken } from "@/lib/auth";

const url = `${env.NEXT_PUBLIC_BACKEND_API_URL}/api/cart`;

/**
 * Agregar item al carrito
 */
export const addItemToCartAction = async (
  payload: AddToCartDTO
): Promise<{ success: boolean; message: string; data?: Cart }> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, message: "No autenticado" };
    }

    const response = await fetch(`${url}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    revalidatePath("/cart");

    return { success: true, message: "Item agregado", data };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

/**
 * Actualizar cantidad de un item
 */
export const updateCartItemAction = async (
  itemId: string,
  quantity: number
): Promise<{ success: boolean; message: string; data?: Cart }> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, message: "No autenticado" };
    }

    const response = await fetch(`${url}/update/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    revalidatePath("/cart");

    return { success: true, message: "Item actualizado", data };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

/**
 * Eliminar item del carrito
 */
export const removeItemFromCartAction = async (
  itemId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, message: "No autenticado" };
    }

    const response = await fetch(`${url}/remove/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    revalidatePath("/cart");
    return { success: true, message: "Item eliminado" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

/**
 * Vaciar carrito
 */
export const clearCartAction = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, message: "No autenticado" };
    }

    const response = await fetch(`${url}/clear`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    revalidatePath("/cart");
    return { success: true, message: "Carrito vaciado" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

/**
 * Validar stock del carrito
 */
export const validateCartStockAction = async (): Promise<{
  success: boolean;
  valid: boolean;
  issues?: Array<{ itemId: string; available: number }>;
}> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, valid: false };
    }

    const response = await fetch(`${url}/validate-stock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    return { success: false, valid: false };
  }
};