/* eslint-disable @typescript-eslint/no-unused-vars */
// app/authors/[id]/edit/EditAuthorClient.tsx
"use client";

import { UpdateAuthorAction } from "@/features/author/services/authorActions";
import { UpdateAuthorDTO } from "@/features/types/author";
import { Author } from "@/features/types/author"; // Asumiendo que tienes este tipo
import { ArrowLeft, Loader2, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditAuthorClientProps {
  initialData: Author;
  authorId: string;
}

export default function EditAuthorClient({ initialData, authorId }: EditAuthorClientProps) {
  // ✅ Ya no necesitas useEffect ni loadingData, los datos vienen del servidor
  const [formData, setFormData] = useState<UpdateAuthorDTO>({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    biography: initialData.biography || "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await UpdateAuthorAction(authorId, formData);

      if (result.success) {
        router.push(`/authors/${authorId}`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error al actualizar el autor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
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
              <User className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Editar Autor
            </h1>
          </div>
          <p className="text-gray-400">
            Actualiza la información del autor
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
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                required
                placeholder="Nombre del autor"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium mb-2">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                required
                placeholder="Apellido del autor"
              />
            </div>

            <div>
              <label htmlFor="biography" className="block text-gray-300 text-sm font-medium mb-2">
                Biografía (opcional)
              </label>
              <textarea
                id="biography"
                value={formData.biography ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, biography: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                rows={4}
                placeholder="Breve biografía del autor"
              />
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
                    Actualizar Autor
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
            <p className="text-gray-400 text-sm mb-1">ID del autor</p>
            <p className="text-gray-300 text-sm font-mono">{authorId}</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-4">
            <p className="text-gray-400 text-sm mb-1">Estado</p>
            <p className="text-blue-400 text-sm font-medium">Editando</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}