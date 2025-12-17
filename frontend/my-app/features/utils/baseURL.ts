export const getBaseUrl = (): string => {
  // En el cliente (browser)
  if (typeof window !== 'undefined') {
    return ''; // Ruta relativa
  }
  
  // En el servidor (SSR)
  // En desarrollo: apunta directo al backend
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5140'; // ← Tu backend directo
  }
  
  // En producción (AWS): apunta a localhost porque nginx maneja todo
  return 'http://localhost:3000'; // ← nginx redirige
};

export const getApiUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  // Asegura que el path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};