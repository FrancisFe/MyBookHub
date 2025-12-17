// features/carts/services/cartService.ts
import { getAuthToken } from "@/lib/auth";
import { getApiUrl } from "@/features/utils/baseURL";

export const getCart = async () => {
  // 1. Verificamos si estamos en el cliente y si hay token
  if (typeof window === "undefined") return null;
  
  const token = getAuthToken(); 
  if (!token) return null; // No disparamos la petición si no hay login

  try {
    const response = await fetch(getApiUrl('/api/cart'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      console.warn("Sesión expirada o no autorizada");
      return null;
    }

    if (!response.ok) throw new Error("Error al obtener el carrito");

    return await response.json();
  } catch (error) {
    console.error("Error en getCart:", error);
    return null;
  }
};