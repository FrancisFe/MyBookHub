/* eslint-disable @typescript-eslint/no-explicit-any */


import { isUserAdmin } from "@/features/auth/services/authService";
import { CreateAuthorDTO, UpdateAuthorDTO } from "@/features/types/author";
import { getApiUrl} from "@/features/utils/baseURL";
import { getAuthToken } from "@/lib/auth";


const url = getApiUrl('/api/author');

export const CreateAuthorAction = async (
  authorData: CreateAuthorDTO
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
      return {
        success: false,
        message: "No autorizado: requiere rol admin.",
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authorData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: Error al crear autor`
      );
    }

    const data = await response.json();


    return {
      success: true,
      message: "Autor creado exitosamente",
      data,
    };
  } catch (error) {
    console.error("Error creating author:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const UpdateAuthorAction = async (
  id: string,
  authorData: UpdateAuthorDTO
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
      return {
        success: false,
        message: "No autorizado: requiere rol admin.",
      };
    }

    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authorData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Error ${response.status}: Error al actualizar autor`
      );
    }

    const data = await response.json();


    return {
      success: true,
      message: "Autor actualizado exitosamente",
      data,
    };
  } catch (error) {
    console.error("Error updating author:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const DeleteAuthorAction = async (
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
      return {
        success: false,
        message: "No autorizado: requiere rol admin.",
      };
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
        errorData.message || `Error ${response.status}: Error al eliminar autor`
      );
    }



    return {
      success: true,
      message: "Autor eliminado exitosamente",
    };
  } catch (error) {
    console.error("Error deleting author:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
