import { jwtDecode } from "jwt-decode";

const TOKEN_NAME = "authToken";
const USER_ID = "userId";
const USER_ROLE = "userRole";
const USER_NAME = "userName";

interface JWTPayload {
  sub: string;
  exp: number;
  // Claims de Microsoft (estos son los que devuelve tu backend)
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

const isClient = () => typeof window !== "undefined";

export function setAuthToken(token: string) {
  if (!isClient()) return;
  
  localStorage.setItem(TOKEN_NAME, token);
  
  const decoded = decodeToken(token);
  if (decoded) {
    // Mapeamos los nombres largos a nombres cortos para el frontend
    const id = decoded.sub || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (id) localStorage.setItem(USER_ID, id);
    if (name) localStorage.setItem(USER_NAME, name);
    if (role) localStorage.setItem(USER_ROLE, role);
    
    console.log("Datos guardados en LocalStorage:", { id, name, role });
  }
  
  window.dispatchEvent(new Event("storage"));
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  return isClient() ? localStorage.getItem(TOKEN_NAME) : null;
}

export function getUserRole(): string | null {
  return isClient() ? localStorage.getItem(USER_ROLE) : null;
}

export function isAdmin(): boolean {
  const role = getUserRole();
  // Tu token devuelve "Admin", así que comparamos ignorando mayúsculas
  return role?.toLowerCase() === "admin";
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;
  const decoded = decodeToken(token);
  if (!decoded) return false;
  return decoded.exp > Math.floor(Date.now() / 1000);
}

export function clearAuthToken() {
  if (!isClient()) return;
  localStorage.clear(); // Limpia todo para asegurar un logout limpio
  window.dispatchEvent(new Event("storage"));
}