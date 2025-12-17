"use client"; // <--- 1. Obligatorio para leer el token del navegador

import { useEffect, useState } from "react";
import { getMyOrders } from "@/features/orders/services/orderService";
import { OrderDto } from "@/features/types/order"; // Asegúrate de que esta ruta sea correcta
import { Package, Calendar, DollarSign, Tag, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Error al obtener órdenes:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Helper para el tipo de item
  const getItemType = (type: unknown): { label: string; colorClass: string } => {
    const t = String(type).toLowerCase();
    const isPurchase = t === "purchase" || t === "compra" || t === "0";
    const isRental = t === "rental" || t === "renta" || t === "1";
    if (isPurchase) return { label: "Compra", colorClass: "text-green-400" };
    if (isRental) return { label: "Renta", colorClass: "text-blue-400" };
    return { label: t || "Desconocido", colorClass: "text-gray-400" };
  };

  // Helper para el estado
  const getStatusInfo = (status: string | number) => {
    const s = Number(status);
    const statusMap: Record<number, { label: string; colorClass: string }> = {
      0: { label: "Pendiente", colorClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
      1: { label: "Pagado", colorClass: "bg-green-500/20 text-green-400 border-green-500/30" },
      2: { label: "Completado", colorClass: "bg-green-500/20 text-green-400 border-green-500/30" },
      3: { label: "Cancelado", colorClass: "bg-red-500/20 text-red-400 border-red-500/30" },
    };
    return statusMap[s] || { label: "Desconocido", colorClass: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-400 animate-pulse">Cargando tu historial...</p>
      </div>
    );
  }

  if (error || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="text-center">
          <div className="p-4 bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {error ? "Hubo un error" : "No tienes órdenes aún"}
          </h1>
          <p className="text-gray-400 mb-6">
            {error ? "No pudimos conectar con el servidor" : "Tus compras y alquileres aparecerán aquí"}
          </p>
          <Link
            href="/books"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Explorar libros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg">
              <Package className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Mis Órdenes
            </h1>
          </div>
          <p className="text-gray-400">Historial de tus compras y alquileres</p>
        </div>

        {/* Lista de órdenes */}
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div
              key={order.id || idx}
              className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300"
            >
              <div className="p-6">
                {/* Cabecera de la orden */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/30 rounded-lg">
                      <Package className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Orden # {order.id}</p>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.orderDate).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusInfo(order.status).colorClass}`}>
                      <Tag className="w-4 h-4" />
                      {getStatusInfo(order.status).label}
                    </span>

                    <div className="flex items-center gap-2 bg-green-900/20 px-4 py-2 rounded-lg border border-green-800/30">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span className="text-white font-bold">
                        ${(order.totalAmount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                {order.items && order.items.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-gray-400 text-sm font-medium">Items ({order.items.length})</p>
                    <div className="grid gap-3">
                      {order.items.map((item, index) => (
                        <div key={item.id || index} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                          <div className="flex-1">
                            <p className="text-white font-medium mb-1">{item.bookTitle}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>Cantidad: {item.quantity}</span>
                              <span>•</span>
                              <span className={getItemType(item.type).colorClass}>{getItemType(item.type).label}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">${(item.price || 0).toFixed(2)}</p>
                            <p className="text-gray-500 text-xs mt-1">Subtotal: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}