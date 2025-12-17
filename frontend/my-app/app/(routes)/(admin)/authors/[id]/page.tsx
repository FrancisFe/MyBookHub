import { getAuthorById } from "@/features/author/services/authorService";
import { User, BookOpen, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return []; 
}
interface AuthorDetailPageProps {
params: Promise<{ id: string }>;
}

export default async function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { id } = await params;
  const author = await getAuthorById(id);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header con navegación */}
        <div className="mb-8">
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Autores
          </Link>
        </div>

        {/* Tarjeta principal del autor */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full flex items-center justify-center border border-gray-700">
              <User className="w-12 h-12 text-blue-400" />
            </div>
            
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {author.fullName}
              </h1>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Autor registrado</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">ID: {author.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biografía */}
          {author.biography && (
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Biografía</h2>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {author.biography}
              </p>
            </div>
          )}

          {/* Información adicional si no hay biografía */}
          {!author.biography && (
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-center italic">
                No hay biografía disponible para este autor
              </p>
            </div>
          )}
        </div>

        {/* Estadísticas/Información adicional */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Nombre</p>
            <p className="text-white font-medium">{author.firstName}</p>
          </div>
          
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Apellido</p>
            <p className="text-white font-medium">{author.lastName}</p>
          </div>
          
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Estado</p>
            <p className="text-green-400 font-medium">Activo</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Acciones</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/authors/${author.id}/edit`}
              className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Editar Autor
            </Link>
            <Link
              href={`/authors/${author.id}/delete`}
              className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all"
            >
              Eliminar Autor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}