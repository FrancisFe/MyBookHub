"use client";

import { CreateAuthorAction } from "@/features/author/services/authorActions";
import { CreateAuthorDTO } from "@/features/types/author";
import { isAdmin } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { UserPlus, User, FileText, ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

const initialForm: CreateAuthorDTO = {
  firstName: "",
  lastName: "",
  biography: "",
};

export default function NewAuthorPage() {
  const [formData, setFormData] = useState<CreateAuthorDTO>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/authors');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await CreateAuthorAction(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      if (result.data?.id) {
        setFormData(initialForm);
        router.push(`/authors/${result.data.id}`);
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
            href="/authors"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Autores
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-900/20 to-emerald-900/10 rounded-lg border border-gray-700">
              <UserPlus className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Nuevo Autor
            </h1>
          </div>
          <p className="text-gray-400">
            Completa los datos para agregar un nuevo autor
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
              <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium mb-2">
                Nombre *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Nombre del autor"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium mb-2">
                Apellido *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="Apellido del autor"
                />
              </div>
            </div>

            <div>
              <label htmlFor="biography" className="block text-gray-300 text-sm font-medium mb-2">
                Biografía (opcional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <textarea
                  id="biography"
                  value={formData.biography ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, biography: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Breve biografía del autor"
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
                    Creando autor...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Crear Autor
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