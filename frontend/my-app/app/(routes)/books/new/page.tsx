"use client";
import { createBookAction } from "@/features/books/services/bookActions";
import { CreateBookDTO } from "@/features/types/book";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusCircle, ArrowLeft, Loader2 } from "lucide-react";

const initialForm: CreateBookDTO = {
  title: "",
  isbn: "",
  description: "",
  purchasePrice: 0,
  rentalPricePerDay: 0,
  stockPurchase: 0,
  stockRental: 0,
  imageUrl: "",
  publishedDate: "",
  authorId: "",
  categoryId: "",
};

export default function NewBookPage() {
  const [formData, setFormData] = useState<CreateBookDTO>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await createBookAction(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      if (result.data?.id) {
        setFormData(initialForm);
        router.push(`/books/${result.data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg">
              <PlusCircle className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Nuevo Libro
            </h1>
          </div>
          <p className="text-gray-400">
            Completa los detalles para agregar un nuevo libro al catálogo
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-800/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-900/30 rounded-full flex items-center justify-center">
                  <span className="text-red-400">!</span>
                </div>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Información básica
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Título del libro"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    ISBN *
                  </label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) =>
                      setFormData({ ...formData, isbn: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="ISBN del libro"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Breve descripción del libro"
                />
              </div>
            </div>

            {/* Precios y Stock */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Precios y disponibilidad
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Precio de compra *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          purchasePrice: Number(e.target.value),
                        })
                      }
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Precio de renta/día *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.rentalPricePerDay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rentalPricePerDay: Number(e.target.value),
                        })
                      }
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Stock compra *
                  </label>
                  <input
                    type="number"
                    value={formData.stockPurchase}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockPurchase: Number(e.target.value),
                      })
                    }
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Stock renta *
                  </label>
                  <input
                    type="number"
                    value={formData.stockRental}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockRental: Number(e.target.value),
                      })
                    }
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Multimedia y relaciones */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Multimedia y relaciones
              </h2>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  URL de la imagen *
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Fecha de publicación *
                  </label>
                  <input
                    type="date"
                    value={formData.publishedDate}
                    onChange={(e) =>
                      setFormData({ ...formData, publishedDate: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    ID del autor *
                  </label>
                  <input
                    type="text"
                    value={formData.authorId}
                    onChange={(e) =>
                      setFormData({ ...formData, authorId: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="ID del autor"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    ID de la categoría *
                  </label>
                  <input
                    type="text"
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="ID de la categoría"
                  />
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-4 border-t border-gray-700">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creando libro...
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    Crear Libro
                  </>
                )}
              </button>
              
              <p className="text-gray-500 text-sm text-center mt-4">
                Todos los campos marcados con * son obligatorios
              </p>
            </div>
          </form>
        </div>

        {/* Nota */}
        <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            El libro será agregado al catálogo inmediatamente después de la creación
          </p>
        </div>
      </div>
    </div>
  );
}