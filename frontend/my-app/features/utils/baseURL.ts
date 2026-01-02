export const getBaseUrl = (): string => {

    return 'http://localhost:5140';


};

export const getApiUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  // Asegura que el path empiece con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};