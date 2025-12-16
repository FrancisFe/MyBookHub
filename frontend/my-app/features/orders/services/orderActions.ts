"use server";

import { env } from "@/config/env";
import { Order } from "@/features/types/order";
import { getAuthToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const CreateOrdersFromCartAction = async (): Promise<{ 
  success: boolean; 
  message: string; 
  data?: Order 
}> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, message: "No autenticado" };
    }
    
    const response = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_API_URL}/api/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Sin body/payload
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    revalidatePath('/books'); 
    revalidatePath('/cart'); 
    
    return { success: true, message: "Orden creada exitosamente", data };
    
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};