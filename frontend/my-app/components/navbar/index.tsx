/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import { isAuthenticated, getUserRole } from "@/lib/auth";
import { LoginButton } from "../button/LoginButton";
import { LogoutButton } from "../button/LogoutButton";
import { 
  ShoppingCart, 
  BookOpen, 
  ChevronDown,
  Tags, 
  Users,
  Package,
  Home
} from "lucide-react";
import { useCart } from "@/context/cartContex";
import Link from "next/link";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [auth, setAuth] = useState({ logged: false, admin: false });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();

  const checkAuth = () => {
    setAuth({
      logged: isAuthenticated(),
      admin: getUserRole()?.toLowerCase() === "admin"
    });
  };

  useEffect(() => {
    setMounted(true);
    checkAuth();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("storage", checkAuth);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("storage", checkAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return <nav className="h-16 bg-gray-900 border-b border-gray-800" />;

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-700 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        
        {/* Logo y navegación izquierda */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gray-800 rounded-lg border border-gray-700 group-hover:border-blue-500 transition-colors">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xl font-bold text-white">
              Books Devlights
            </span>
          </Link>

          {/* Navegación principal */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
            
            <Link 
              href="/books" 
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Libros</span>
            </Link>
          </div>
        </div>

        {/* Centro: Admin Dropdown */}
        <div className="flex items-center gap-4">
          {auth.admin && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isDropdownOpen 
                    ? 'bg-gray-800 text-white border border-gray-600' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <div className="w-6 h-6 bg-blue-900/30 rounded flex items-center justify-center">
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                <span>Administración</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-3 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">Panel Admin</p>
                    <p className="text-xs text-gray-400">Recursos exclusivos</p>
                  </div>
                  
                  <div className="py-2">
                    <Link 
                      href="/authors" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="p-2 bg-gray-700/50 rounded">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Autores</p>
                        <p className="text-xs text-gray-400">Gestionar autores</p>
                      </div>
                    </Link>
                    
                    <Link 
                      href="/categories" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="p-2 bg-gray-700/50 rounded">
                        <Tags className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Categorías</p>
                        <p className="text-xs text-gray-400">Gestionar categorías</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Derecha: Carrito, Órdenes y Auth */}
        <div className="flex items-center gap-3">
          {auth.logged && (
            <>
              <Link 
                href="/orders/my-orders" 
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Mis Órdenes</span>
              </Link>

              <Link href="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="h-6 w-px bg-gray-700 mx-1"></div>
            </>
          )}

          {auth.logged ? (
            <LogoutButton />
          ) : (
            <div className="flex items-center gap-2">
              <LoginButton variant="login" />
              <LoginButton variant="register" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}