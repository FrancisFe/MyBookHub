/* eslint-disable @typescript-eslint/no-explicit-any */


import { CreateBookDTO, UpdateBookDTO } from "../../types/book";


import { getAuthToken } from "../../../lib/auth";
import { isUserAdmin } from "@/features/auth/services/authService";
import { getApiUrl } from "@/features/utils/baseURL";

const url = getApiUrl('/api/book');
/**
 * Crear un nuevo libro
 */
export const createBookAction = async (
  bookData: CreateBookDTO
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "No autenticado. Por favor inicia sesión.",
      };
    }
    const admin = await isUserAdmin();
    if (!admin) {
      return { success: false, message: "No autorizado: requiere rol admin." };
    }
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al crear el libro");
  }

   const data = await response.json();


    return {
      success: true,
      message: "Libro creado exitosamente",
      data: data,
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

/**
 * Actualizar un libro
 */
export const updateBookAction = async (
  id: string,
  bookData: UpdateBookDTO
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "No autenticado. Por favor inicia sesión.",
      };
    }
    const admin = await isUserAdmin();
    if (!admin) {
      return { success: false, message: "No autorizado: requiere rol admin." };
    }
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });

    
    if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al actualizar el libro");
  }

   const data = await response.json();


    return {
      success: true,
      message: "Libro actualizado exitosamente",
      data: data,
    };
  } catch (error) {
    console.error(`Error updating book ${id}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

/**
 * Eliminar un libro
 */
export const deleteBookAction = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return {
        success: false,
        message: "No autenticado. Por favor inicia sesión.",
      };
    }
    const admin = await isUserAdmin();
    if (!admin) {
      return { success: false, message: "No autorizado: requiere rol admin." };
    }
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    return {
      success: true,
      message: "Libro eliminado exitosamente",
    };
  } catch (error) {
    console.error(`Error deleting book ${id}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
