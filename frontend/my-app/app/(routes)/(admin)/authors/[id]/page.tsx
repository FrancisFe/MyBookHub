import { getAuthorById, getAuthors } from "@/features/author/services/authorService";
import AuthorDetailClient from "./AuthorDetailClient";

interface AuthorDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    id: author.id.toString(),
  }));
}

export default async function AuthorDetailPage({ params }: AuthorDetailPageProps) {
  const { id } = await params;
  const author = await getAuthorById(id);

  return <AuthorDetailClient author={author} />;
}