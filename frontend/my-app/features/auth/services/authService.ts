/* eslint-disable @typescript-eslint/no-unused-vars */

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
  try {
    const token = await getAuthToken();

    if (!token) {
      return false;
    }

    const response = await fetch(
      getApiUrl('/api/auth/is-admin'),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return false;
    }

    const isAdmin = await response.json();
    return isAdmin;
  } catch (er) {
    return false;
  }
};
