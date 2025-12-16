import { Book } from "./book";

export interface Author{
    id: number;
    firstName: string;
    lastName: string;
    biography?: string;
    fullName: string;
    books: Book[];
}

export interface AuthorDTO {
  id: number;
  firstName: string;
  lastName: string;
  biography?: string;
  fullName: string;
}
export interface CreateAuthorDTO{
    firstName: string;
    lastName: string;
    biography?: string;
}

export interface UpdateAuthorDTO{
    firstName?: string;
    lastName?: string;
    biography?: string;
}