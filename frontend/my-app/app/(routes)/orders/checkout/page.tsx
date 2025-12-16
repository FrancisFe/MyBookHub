"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContex";
import { CreateOrdersFromCartAction } from "@/features/orders/services/orderActions";
import { ArrowLeft, CreditCard, ShoppingBag, Loader2, Lock } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Datos de la tarjeta
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [formValid, setFormValid] = useState(false);

  // Validar formulario
  const validateForm = () => {
    const isValid = 
      cardNumber.replace(/\s/g, "").length === 16 &&
      cardName.trim().length > 0 &&
      expiryDate.length === 5 &&
      cvv.length === 3;
    setFormValid(isValid);
  };

  // Formatear número de tarjeta
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    if (cleaned.length <= 16 && /^\d*$/.test(cleaned)) {
      const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
      setCardNumber(formatted);
      validateForm();
    }
  };

  // Formatear fecha de expiración
  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 4) {
      const formatted = cleaned.length >= 2 
        ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` 
        : cleaned;
      setExpiryDate(formatted);
      validateForm();
    }
  };

  // Formatear CVV
  const handleCvvChange = (value: string) => {
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
      validateForm();
    }
  };

  const handleCreateOrder = async () => {
    if (!formValid) {
      setError("Por favor completa todos los campos de la tarjeta correctamente");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await CreateOrdersFromCartAction();

      if (result.success && result.data) {
        // Limpiar carrito
        clearCart();
        
        // Redirigir a página de confirmación
        router.push(`/orders/confirmation?orderId=${result.data.id}`);
      } else {
        setError(result.message || "Error al crear la orden");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Carrito vacío</h1>
          <p className="text-gray-400 mb-6">No tienes items en tu carrito</p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al carrito
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg">
              <CreditCard className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Checkout
            </h1>
          </div>
          <p className="text-gray-400">
            Revisa y confirma tu compra
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumen de la orden */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Resumen del pedido ({items.length} {items.length === 1 ? 'ítem' : 'ítems'})
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-700">
                    <div>
                      <p className="text-white font-medium">Producto {item.bookId}</p>
                      <p className="text-gray-400 text-sm">
                        {item.type === "Purchase" ? "Compra" : "Renta"} • {item.quantity} unidad(es)
                      </p>
                    </div>
                    <p className="text-white font-medium">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de confirmación */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Datos de pago
              </h3>
              
              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              {/* Formulario de tarjeta */}
              <div className="space-y-4 mb-6">
                {/* Número de tarjeta */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de tarjeta
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-blue-500"
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Nombre en la tarjeta */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre en la tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => {
                      setCardName(e.target.value);
                      validateForm();
                    }}
                    placeholder="JUAN PÉREZ"
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>

                {/* Fecha de expiración y CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiración
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      placeholder="MM/AA"
                      className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        placeholder="123"
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-blue-500"
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Total y botón */}
              <div className="space-y-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total a pagar</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCreateOrder}
                  disabled={loading || !formValid}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando pago...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pagar ${totalPrice.toFixed(2)}
                    </>
                  )}
                </button>
                
                <p className="text-gray-500 text-xs text-center">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Transacción segura y encriptada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}