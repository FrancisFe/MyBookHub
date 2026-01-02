/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Library, Users } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a <span className="text-blue-400">MyBookHub</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Tu biblioteca digital para explorar y gestionar libros
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/books" 
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Library className="w-5 h-5" />
              Explorar Biblioteca
            </Link>
            
            {!isLoggedIn && (
              <Link 
                href="/login" 
                className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-gray-700"
              >
                <Users className="w-5 h-5" />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">
            ¿Por qué elegir MyBookHub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="w-10 h-10 bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Catálogo Amplio</h3>
              <p className="text-gray-400 text-sm">
                Libros de diferentes géneros, autores y categorías
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="w-10 h-10 bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Comunidad</h3>
              <p className="text-gray-400 text-sm">
                Únete a lectores apasionados por los libros
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Comienza tu viaje literario
          </h2>
          <p className="text-gray-300 mb-8">
            Descubre un mundo de conocimiento y entretenimiento
          </p>
          
          {!isLoggedIn ? (
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Crear Cuenta Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link 
              href="/books" 
              className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Ver Catálogo Completo
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}