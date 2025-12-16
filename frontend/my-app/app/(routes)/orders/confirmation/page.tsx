"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!orderId) {
      router.push("/books");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderId, router]);

  useEffect(() => {
    if(countdown === 0){
      router.push("/orders/my-orders");
    }
  }, [countdown, router]);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
          {/* Icono de éxito */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-400" />
              </div>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-white mb-2">
            ¡Orden creada exitosamente!
          </h1>
          
          {/* ID de orden */}
          <div className="inline-flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-lg mb-6">
            <Package className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400 text-sm">Orden {orderId}</span>
          </div>

          {/* Mensaje */}
          <p className="text-gray-400 mb-8">
            Tu orden ha sido procesada correctamente. Puedes ver los detalles en la sección de Mis Órdenes.
          </p>

          {/* Botones */}
          <div className="space-y-3">
            <Link
              href="/orders/my-orders"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              Ver mis órdenes
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/books"
              className="flex items-center justify-center w-full bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              Continuar comprando
            </Link>
          </div>

          {/* Contador de redirección */}
          <p className="text-gray-500 text-sm mt-6">
            Serás redirigido automáticamente en {countdown}s
          </p>
        </div>
      </div>
    </div>
  );
}
