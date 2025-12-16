"use client";
import { CreateCategoryAction } from "@/features/categories/services/categoryActions";
import { CreateCategoryDTO } from "@/features/types/category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Tag, FileText, ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

const initialForm: CreateCategoryDTO = {
  name: "",
  description: "",
};

export default function NewCategoryPage() {
  const [formData, setFormData] = useState<CreateCategoryDTO>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await CreateCategoryAction(formData);
      if (!result.success) {
        throw new Error(result.message);
      }

      if (result.data?.id) {
        setFormData(initialForm);
        router.push(`/categories/${result.data.id}`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Categorías
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-900/20 to-emerald-900/10 rounded-lg border border-gray-700">
              <Plus className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Nueva Categoría
            </h1>
          </div>
          <p className="text-gray-400">
            Completa los datos para agregar una nueva categoría
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                Nombre *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Nombre de la categoría"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">
                Descripción (opcional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Breve descripción de la categoría"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creando categoría...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Crear Categoría
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Notas */}
        <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Los campos marcados con * son obligatorios
          </p>
        </div>
      </div>
    </div>
  );
}