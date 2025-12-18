// app/books/[id]/delete/DeleteBookClient.tsx
"use client";

import { deleteBookAction } from "@/features/books/services/bookActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/auth";
import {
  Trash2,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Loader2,
  BookOpen,
} from "lucide-react";

interface DeleteBookClientProps {
  bookId: string;
  bookTitle: string;
}

export default function DeleteBookClient({ bookId, bookTitle }: DeleteBookClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ Ya no necesitas useEffect para cargar datos, vienen del servidor
  // ✅ Ya no necesitas loadingData state

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const isUserAdmin = isAdmin();
      if (!isUserAdmin) {
        router.push('/books');
        return;
      }
      

      setCheckingAuth(false);
    };
    checkAdminAndFetch();
  }, [router]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/books");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen p-4 sm:p-6 bg-gray-900 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await deleteBookAction(bookId);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || "Error al eliminar el libro");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // ✅ Eliminamos el loading inicial, los datos ya están
  
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-900/20 to-emerald-900/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-800/30">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">¡Éxito!</h2>

            <p className="text-gray-300">
              El libro <strong className="text-white">{bookTitle}</strong> ha
              sido eliminado correctamente.
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
            <p className="text-gray-400 text-sm text-center">
              Redirigiendo a la lista de libros...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-800/30">
            <BookOpen className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Eliminar Libro
          </h1>

          <p className="text-gray-400 text-sm">
            Acción permanente e irreversible
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Warning */}
        <div className="mb-8 p-4 bg-gradient-to-r from-red-900/10 to-orange-900/5 border border-red-800/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />

            <div>
              <p className="text-white font-medium mb-1">
                ¿Estás completamente seguro?
              </p>

              <p className="text-gray-400 text-sm">
                Estás a punto de eliminar permanentemente el libro:
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg">
            <p className="text-center text-xl font-bold text-white">
              {bookTitle}
            </p>

            <p className="text-center text-gray-400 text-sm mt-1">
              ID: {bookId}
            </p>
          </div>
        </div>

        {/* Consequences */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-3">Consecuencias:</p>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span>Esta acción no se puede deshacer</span>
            </li>

            <li className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span>Todos los datos del libro se perderán</span>
            </li>

            <li className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <span>Se eliminarán registros relacionados</span>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-600 hover:text-white disabled:opacity-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Eliminar
              </>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-500 text-xs text-center">
            Esta acción requiere privilegios de administrador
          </p>
        </div>
      </div>
    </div>
  );
}
