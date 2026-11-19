import { randomUUID } from "node:crypto";
import type { Book } from "../models/book.js";
import type { CreateBookInput, UpdateBookInput } from "../schemas/bookSchemas.js";

const books: Book[] = [];

export function getAllBooks(): Book[] { return books; }
export function getBookById(id: string): Book | undefined { return books.find((book) => book.id === id); }

export function createBook(input: CreateBookInput): Book {
  const book: Book = { id: randomUUID(), ...input };
  books.push(book);
  return book;
}

export function updateBook(id: string, input: UpdateBookInput): Book | undefined {
  const book = getBookById(id);
  if (!book) return undefined;
  Object.assign(book, input);
  return book;
}

export function deleteBook(id: string): boolean {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
}
