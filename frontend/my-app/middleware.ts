import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";


const TOKEN_NAME = "authToken";

interface JWTPayload {
  exp: number;
}

// Reutiliza la misma lógica que baseURL.ts para compatibilidad con AWS/nginx
const getBackendUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5140'; // Backend directo en desarrollo
  }
  return 'http://localhost:3000'; // En producción nginx maneja el proxy
};

async function isAdmin(token: string): Promise<boolean> {
  try {
    const backendUrl = getBackendUrl();
    const res = await fetch(
      `${backendUrl}/api/auth/is-admin`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data);
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  const { pathname } = request.nextUrl;

  // Proteger rutas de administración: crear/editar/eliminar libros

  const isAdminRoute =
    pathname.startsWith("/categories") ||
    pathname.startsWith("/authors") ||
    pathname.startsWith("/books/new") ||
    (pathname.startsWith("/books/") &&
      (pathname.endsWith("/edit") || pathname.endsWith("/delete")));

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete(TOKEN_NAME);
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(TOKEN_NAME);
      return response;
    }

    // Verificar rol admin
    return isAdmin(token).then((ok) => {
      if (!ok) {
        return NextResponse.redirect(new URL("/books", request.url));
      }
      return NextResponse.next();
    });
  }

  // Si está en login/register y ya tiene token, ir a /books
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/books", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/books/:path*",
    "/categories/:path*",
    "/authors/:path*",
    "/login",
    "/register",
  ],
};
