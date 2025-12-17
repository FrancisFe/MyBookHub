"use client";

import Link from "next/link";

type Variant = "login" | "register";

interface AuthButtonProps {
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
}

const LABEL: Record<Variant, string> = {
  login: "Iniciar sesión",
  register: "Registrarse",
};

const HREF: Record<Variant, string> = {
  login: "/login",
  register: "/register",
};

export function LoginButton({ variant = "login", className, fullWidth }: AuthButtonProps) {
  // Clases diferentes según el tipo de botón para mejor UX
  const variantClasses = variant === "login" 
    ? "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white" 
    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white";

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 active:scale-95";
  const widthClasses = fullWidth ? " w-full" : "";
  const extraClasses = className ? ` ${className}` : "";

  return (
    <Link
      href={HREF[variant]}
      className={`${baseClasses} ${variantClasses} ${widthClasses} ${extraClasses}`}
    >
      {LABEL[variant]}
    </Link>
  );
}