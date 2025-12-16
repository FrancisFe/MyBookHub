"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContex";
import { CreditCard } from "lucide-react";

export default function AddToOrderButton() {
  const router = useRouter();
  const { items, totalPrice } = useCart();

  const handleGoToCheckout = () => {
    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    router.push("/orders/checkout");
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <button
      onClick={handleGoToCheckout}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <CreditCard className="w-5 h-5" />
      Proceder al Pago (${totalPrice.toFixed(2)})
    </button>
  );
}