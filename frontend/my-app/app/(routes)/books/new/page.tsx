"use client";
import { createBookAction } from "@/features/books/services/bookActions";
import { CreateBookDTO } from "@/features/types/book";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-400 hover:text-blue-300 mb-6 inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Volver</span>
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Nuevo Libro
          </h1>
          <p className="text-gray-400">
            Completa los detalles para agregar un nuevo libro
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Información básica</h2>
              
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Descripción del libro"
                />
              </div>
            </div>

            {/* Precios y Stock */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Precios y Stock</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Precio de compra *
                  </label>
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Precio de compra"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Precio de renta/día *
                  </label>
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Precio de renta por día"
                  />
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Stock para compra"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Stock para renta"
                  />
                </div>
              </div>
            </div>

            {/* Multimedia y relaciones */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Multimedia y relaciones</h2>
              
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="URL de la imagen"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="ID de la categoría"
                  />
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creando libro..." : "Crear Libro"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}