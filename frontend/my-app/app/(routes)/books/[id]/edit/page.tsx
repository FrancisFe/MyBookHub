/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateBookAction } from "@/features/books/services/bookActions";
import { getBookById } from "@/features/books/services/bookService";
import { UpdateBookDTO } from "@/features/types/book";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Loader2, BookOpen } from "lucide-react";

const updateBookForm: UpdateBookDTO = {
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

export default function EditBookPage() {
  const params = useParams();
  const bookId = params.id as string;

  const [formData, setFormData] = useState<UpdateBookDTO>(updateBookForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadBook = async () => {
      try {
        const book = await getBookById(bookId);
        setFormData({
          title: book.title,
          isbn: book.isbn,
          description: book.description || "",
          purchasePrice: book.purchasePrice,
          rentalPricePerDay: book.rentalPricePerDay,
          stockPurchase: book.stockPurchase,
          stockRental: book.stockRental,
          imageUrl: book.imageUrl || "",
          publishedDate: book.publishedDate,
          authorId:
            typeof book.author === "string" ? book.author : book.author.id,
          categoryId:
            typeof book.category === "string"
              ? book.category
              : book.category.id,
        });
      } catch (err) {
        setError("Error al cargar el libro");
      } finally {
        setLoadingData(false);
      }
    };

    loadBook();
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await updateBookAction(bookId, formData);

      if (result.success && result.data?.id) {
        router.push(`/books/${result.data.id}`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando libro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
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
            <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Editar Libro
            </h1>
          </div>
          <p className="text-gray-400">
            Actualiza la información del libro
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Información básica */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Título
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
                  ISBN
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

            {/* Precios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Precio de compra
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
                    className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Precio de alquiler por día
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
                    className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Stock de compra
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Stock de alquiler
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Imagen y fechas */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Imagen del libro (URL)
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="URL de la imagen del libro"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Fecha de publicación
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
                  Autor ID
                </label>
                <input
                  type="text"
                  value={formData.authorId}
                  onChange={(e) =>
                    setFormData({ ...formData, authorId: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="ID del autor del libro"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Categoría ID
              </label>
              <input
                type="text"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="ID de la categoría del libro"
              />
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Actualizar Libro
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Todos los campos son obligatorios excepto descripción e imagen
          </p>
        </div>
      </div>
    </div>
  );
}