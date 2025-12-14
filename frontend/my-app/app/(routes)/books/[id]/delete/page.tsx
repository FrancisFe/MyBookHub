/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { deleteBookAction } from "@/features/books/services/bookActions";
import { getBookById } from "@/features/books/services/bookService";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DeleteBookPage() {
  const params = useParams();
  const bookId = params.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookTitle, setBookTitle] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      try {
        const book = await getBookById(bookId);
        setBookTitle(book.title);
      } catch (err) {
        setError("Error al cargar el libro");
      } finally {
        setLoadingData(false);
      }
    };

    loadBook();
  }, [bookId]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/books");
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [success, router]);

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

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded mb-4">
            <h2 className="font-bold text-lg mb-2">¡Éxito!</h2>
            <p>El libro {bookTitle}&quot; ha sido eliminado correctamente.</p>
            <p className="text-sm mt-2">Redirigiendo a la lista de libros...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
          Eliminar Libro
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="text-center text-lg mb-4">
            ¿Estás seguro de que deseas eliminar el libro:
          </p>
          <p className="text-center font-bold text-xl mb-6">{bookTitle}?</p>
          <p className="text-center text-sm text-gray-600">
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded hover:bg-gray-400 disabled:opacity-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 disabled:opacity-50 transition"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}