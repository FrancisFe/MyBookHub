"use client";

import { clearAuthToken } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  fullWidth?: boolean;
}

export function LogoutButton({ className, fullWidth }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const baseClasses =
    "inline-flex items-center justify-center rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 transition cursor-pointer";
  const widthClasses = fullWidth ? " w-full" : "";
  const extraClasses = className ? ` ${className}` : "";

  const handleLogout = () => {
    // 1. Limpiar caché de React Query (Carts, Orders, etc.)
    queryClient.clear();
    
    // 2. Limpiar localStorage (Esto dispara el evento 'storage' que actualiza el Navbar)
    clearAuthToken();
    
    // 3. Redirigir y refrescar el estado de la ruta
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className={`${baseClasses}${widthClasses}${extraClasses}`}
    >
      Cerrar sesión
    </button>
  );
}