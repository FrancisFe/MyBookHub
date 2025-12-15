import Link from "next/link";
import { BookOpen, ArrowRight, Library, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-8">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Bienvenido a <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Books Devlights</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Tu biblioteca digital para explorar, gestionar y disfrutar de una amplia colección de libros
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/books" 
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <Library className="w-5 h-5" />
                Explorar Biblioteca
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center gap-3 bg-gray-800 text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 hover:text-white transition-all duration-300 border border-gray-700"
              >
                <Users className="w-5 h-5" />
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegir Books Devlights?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Catálogo Amplio</h3>
              <p className="text-gray-400">
                Accede a miles de libros de diferentes géneros, autores y categorías
              </p>
            </div>
            
    
            
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Comunidad Activa</h3>
              <p className="text-gray-400">
                Únete a una comunidad de lectores apasionados por los libros
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Comienza tu viaje literario hoy
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Regístrate gratis y descubre un mundo de conocimiento y entretenimiento
          </p>
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
          >
            Crear Cuenta Gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}