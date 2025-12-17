import { BookDetailsDTO, BookDTO } from "@/features/types/book";
import { getApiUrl } from "@/features/utils/baseURL";


if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}


const url = getApiUrl('/api/book');

/** * Obtener todos los libros
 */
export const getBooks = async (): Promise<BookDTO[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0, tags: ['books'] },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    throw error;
  }
};
/**
 * Obtener un libro por ID
 */
export const getBookById = async (id: string): Promise<BookDetailsDTO> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0, tags: ['books', `book-${id}`] },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: BookDetailsDTO = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching book ${id}: `, error);
    throw error;
  }
};

/**
 * Buscar libros
 */
export const searchBooks = async (query: string): Promise<BookDTO[]> => {
  try {
    const response = await fetch(
      `${url}/search?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0, tags: ['books'] },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};
