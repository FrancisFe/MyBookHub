export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
        </div>
      </div>
      <p className="mt-6 text-gray-400 text-lg">Cargando contenido...</p>
      <p className="mt-2 text-gray-500 text-sm">Por favor espera un momento</p>
    </div>
  );
}