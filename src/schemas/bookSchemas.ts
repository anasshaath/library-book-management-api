import { z } from "zod";

const nonEmptyText = z.string().trim().min(1, "Must not be empty");

export const createBookSchema = z.object({
  title: nonEmptyText,
  author: nonEmptyText,
  genre: nonEmptyText,
  available: z.boolean(),
}).strict();

export const updateBookSchema = z.object({
  title: nonEmptyText.optional(),
  author: nonEmptyText.optional(),
  genre: nonEmptyText.optional(),
  available: z.boolean().optional(),
}).strict().refine((value) => Object.keys(value).length > 0, {
  message: "At least one field must be supplied",
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
