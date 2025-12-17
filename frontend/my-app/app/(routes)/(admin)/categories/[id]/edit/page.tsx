/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { UpdateCategoryAction } from "@/features/categories/services/categoryActions";
import { getCategoryById } from "@/features/categories/services/categoryService";
import { UpdateCategoryDTO } from "@/features/types/category";
import { Loader2, Tag, FileText, ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export async function generateStaticParams() {
  return []; 
}
const updateCategoryFrom: UpdateCategoryDTO = {
  name: "",
  description: "",
};

export default function EditCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const [formData, setFormData] = useState<UpdateCategoryDTO>(updateCategoryFrom);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const category = await getCategoryById(categoryId);
        setFormData({
          name: category.name,
          description: category.description || "",
        });
      } catch (err) {
        setError("Error al cargar los datos de la categoría.");
      } finally {
        setLoadingData(false);
      }
    };
    loadCategory();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await UpdateCategoryAction(categoryId, formData);
      if (result.success) {
        router.push(`/categories/${categoryId}`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error al actualizar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando categoría...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-md mx-auto">
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
              <Tag className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Editar Categoría
            </h1>
          </div>
          <p className="text-gray-400">
            Actualiza la información de la categoría
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
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  required
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
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Actualizar Categoría
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
            <p className="text-gray-400 text-sm mb-1">ID de la categoría</p>
            <p className="text-gray-300 text-sm font-mono">{categoryId}</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
            <p className="text-gray-400 text-sm mb-1">Estado</p>
            <p className="text-blue-400 text-sm font-medium">Editando</p>
          </div>
        </div>
      </div>
    </div>
  );
}