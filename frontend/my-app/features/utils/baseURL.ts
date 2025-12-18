export const getBaseUrl = (): string => {
  // 1. Si NO estamos en el navegador (es decir, estamos en el BUILD/Node.js)
  if (typeof window === 'undefined') {
    return 'http://localhost:5000'; // URL completa para que el build no falle
  }

  // 2. Si estamos en el NAVEGADOR (Cliente)
  return ''; // Ruta relativa para que Nginx haga su magia
};

export const getApiUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  // Asegura que el path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};