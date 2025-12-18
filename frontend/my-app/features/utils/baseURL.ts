export const getBaseUrl = (): string => {
  // 1. Si NO estamos en el navegador (es decir, estamos en el BUILD/Node.js)

    return 'http://localhost:5140'; // URL completa para que el build no falle

};

export const getApiUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  // Asegura que el path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};