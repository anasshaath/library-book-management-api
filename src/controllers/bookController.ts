import type { Request, Response } from "express";
import { createBookSchema, updateBookSchema } from "../schemas/bookSchemas.js";
import * as bookService from "../services/bookService.js";

function sendValidationError(response: Response, issues: unknown): void {
  response.status(400).json({ error: "Invalid input", details: issues });
}

function getId(request: Request): string | undefined {
  const id = request.params.id;
  return typeof id === "string" ? id : undefined;
}

export function listBooks(_request: Request, response: Response): void { response.json(bookService.getAllBooks()); }

export function getBook(request: Request, response: Response): void {
  const id = getId(request);
  const book = id ? bookService.getBookById(id) : undefined;
  if (!book) { response.status(404).json({ error: "Book not found" }); return; }
  response.json(book);
}

export function addBook(request: Request, response: Response): void {
  const result = createBookSchema.safeParse(request.body);
  if (!result.success) { sendValidationError(response, result.error.issues); return; }
  response.status(201).json(bookService.createBook(result.data));
}

export function editBook(request: Request, response: Response): void {
  const result = updateBookSchema.safeParse(request.body);
  if (!result.success) { sendValidationError(response, result.error.issues); return; }
  const id = getId(request);
  const book = id ? bookService.updateBook(id, result.data) : undefined;
  if (!book) { response.status(404).json({ error: "Book not found" }); return; }
  response.json(book);
}

export function removeBook(request: Request, response: Response): void {
  const id = getId(request);
  if (!id || !bookService.deleteBook(id)) { response.status(404).json({ error: "Book not found" }); return; }
  response.status(204).send();
}
