import { Router } from "express";
import { addBook, editBook, getBook, listBooks, removeBook } from "../controllers/bookController.js";

export const bookRouter = Router();
bookRouter.get("/", listBooks);
bookRouter.get("/:id", getBook);
bookRouter.post("/", addBook);
bookRouter.patch("/:id", editBook);
bookRouter.delete("/:id", removeBook);
