

import { getApiUrl } from "@/features/utils/baseURL";
import { getAuthToken } from "@/lib/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TokenResponse {
  token: string;
  expiresIn: string;
}

export const loginUser = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await fetch(
    getApiUrl('/api/auth/login'),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al iniciar sesión");
  }

  return response.json();
};

export const registerUser = async (data: RegisterRequest): Promise<void> => {
  const response = await fetch(
    getApiUrl('/api/auth/register'),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al registrarse");
  }
};

export const isUserAdmin = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false; // Evita ejecución en build

  try {
    const token = getAuthToken(); // Usa la función de lib/auth (cliente)
    if (!token) return false;

    const response = await fetch(getApiUrl('/api/auth/is-admin'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok) return false;
    return await response.json();
  } catch {
    return false;
  }
};
