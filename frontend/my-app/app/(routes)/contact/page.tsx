import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Contacto
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta, sugerencia o reclamo? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Información de contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <p className="text-gray-400">soporte@booksdevlights.com</p>
                    <p className="text-gray-400 text-sm">Respuesta en 24-48 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Teléfono</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">Lunes a Viernes: 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-900/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Dirección</h3>
                    <p className="text-gray-400">Av. Principal 1234</p>
                    <p className="text-gray-400">Entre Ríos, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-900/20 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Horario de atención</h3>
                    <p className="text-gray-400">Lunes a Viernes: 8:00 - 18:00</p>
                    <p className="text-gray-400">Sábados: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ rápida */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">¿Necesitas ayuda rápida?</h2>
              <div className="space-y-3">
                <Link 
                  href="/orders/my-orders" 
                  className="block p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <p className="text-white font-medium">Consulta el estado de tu pedido</p>
                  <p className="text-gray-400 text-sm">Revisa tus órdenes en tiempo real</p>
                </Link>
                <Link 
                  href="/books" 
                  className="block p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <p className="text-white font-medium">Problemas con un libro</p>
                  <p className="text-gray-400 text-sm">Reporta problemas de stock o calidad</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Asunto *
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="reclamo">Reclamo o queja</option>
                  <option value="consulta">Consulta general</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mensaje *
                </label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Describe tu consulta, reclamo o sugerencia..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </button>

              <p className="text-gray-500 text-sm text-center">
                * Todos los campos son obligatorios. Te responderemos a la brevedad.
              </p>
            </form>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800/30 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Tiempo de respuesta</h3>
              <p className="text-gray-400">Email: 24-48 horas</p>
              <p className="text-gray-400">Teléfono: Inmediato</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800/30 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Soporte prioritario</h3>
              <p className="text-gray-400">Reclamos: 24 horas</p>
              <p className="text-gray-400">Urgencias: +1 (555) 987-6543</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800/30 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Documentación</h3>
              <p className="text-gray-400">
                <Link href="/" className="text-blue-400 hover:text-blue-300">
                  Términos y condiciones
                </Link>
              </p>
              <p className="text-gray-400">
                <Link href="/" className="text-blue-400 hover:text-blue-300">
                  Política de devoluciones
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}