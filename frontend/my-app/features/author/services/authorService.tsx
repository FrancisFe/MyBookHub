import { env } from "@/config/env";
import { Author, AuthorDTO } from "@/features/types/author";

const url = `${env.NEXT_PUBLIC_BACKEND_API_URL}/api/author`;

export const getAuthors = async (): Promise<AuthorDTO[]> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0, tags: ["authors"] },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching authors:", error);
    throw error;
  }
};

export const getAuthorById = async (id: string): Promise<Author> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0, tags: ["authors", `author-${id}`] },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching author by id:", error);
    throw error;
  }
};
