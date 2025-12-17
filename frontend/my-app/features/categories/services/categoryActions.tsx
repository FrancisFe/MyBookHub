/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isUserAdmin } from "@/features/auth/services/authService";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/features/types/category";
import { getApiUrl } from "@/features/utils/baseURL";
import { getAuthToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const url = getApiUrl('/api/category');

export const CreateCategoryAction = async (
  categoryData: CreateCategoryDTO
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
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Error ${response.status}: Error al crear categoría`
      );
    }

    const data = await response.json();

      revalidatePath("/categories");
    return {
      success: true,
      message: "Categoría creada exitosamente",
      data: data,
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const UpdateCategoryAction = async (
  id: string,
  categoryData: UpdateCategoryDTO
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
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: Error al actualizar`
      );
    }

    const data = await response.json();

    revalidatePath("/categories");
    return {
      success: true,
      message: "Categoría actualizada exitosamente",
      data: data,
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const DeleteCategoryAction = async (
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Error ${response.status}: Error al eliminar categoría`
      );
    }
    revalidatePath("/categories");
    return {
      success: true,
      message: "Categoría eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
