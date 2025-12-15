import Link from "next/link";
import { LoginButton } from "@/components/button/LoginButton";
import { CartButton } from "./CartButton";
import { isAuthenticated } from "@/lib/auth";
import { LogoutButton } from "../button/LogoutButton";
import { Home, BookOpen, Phone} from "lucide-react";

const navItems = [
  {
    label: "Inicio",
    href: "/",
    icon: <Home className="w-4 h-4" />,
  },
  {
    label: "Libros",
    href: "/books",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    label: "Contacto",
    href: "/contact",
    icon: <Phone className="w-4 h-4" />,
  },
];

export default async function Navbar() {
  const authenticated = await isAuthenticated();

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y navegación */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 mr-8 hover:opacity-90 transition-opacity"
            >
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Books Devlights
              </span>
            </Link>

            {/* Navegación principal */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className="group flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4/5 transition-all duration-300"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-4">
            {/* Carrito */}
            {authenticated && <CartButton />}

            {/* Separador */}
            {authenticated && <div className="h-6 w-px bg-gray-700"></div>}

            {/* Autenticación */}
            <div className="flex items-center space-x-2">
              {authenticated ? (
                <>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <LoginButton variant="login" />
                  <div className="hidden sm:block">
                    <LoginButton variant="register" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navegación móvil */}
        <div className="md:hidden pb-4">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="flex flex-col items-center gap-1 px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <div className="p-2 bg-gray-800 rounded-lg">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
