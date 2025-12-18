// components/AdminDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Settings, ChevronDown, User, Tag, Shield } from "lucide-react";

export default function AdminDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const adminItems = [
    {
      label: "Autores",
      href: "/authors",
      icon: <User className="w-4 h-4" />,
      description: "Gestionar autores"
    },
    {
      label: "Categorías",
      href: "/categories",
      icon: <Tag className="w-4 h-4" />,
      description: "Gestionar categorías"
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón del dropdown */}
      <button
        onClick={toggleDropdown}
        className="group flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <div className="p-1 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded border border-yellow-800/30">
            <Settings className="w-4 h-4 text-yellow-400" />
          </div>
          <span className="font-medium">Gestión</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          {/* Header del dropdown */}
          <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 rounded-lg border border-yellow-800/30">
                <Shield className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Panel de Gestión</h3>
                <p className="text-gray-400 text-xs">Recursos exclusivos para administradores</p>
              </div>
            </div>
          </div>

          {/* Items del dropdown */}
          <div className="p-2">
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDropdown}
                className="group flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
              >
                <div className="p-2 bg-gray-700/50 group-hover:bg-gray-600/50 rounded-lg">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>

          {/* Footer del dropdown */}
          <div className="p-3 bg-gray-900/50 border-t border-gray-700">
            <p className="text-gray-500 text-xs text-center">
              Acceso restringido a administradores
            </p>
          </div>
        </div>
      )}
    </div>
  );
}