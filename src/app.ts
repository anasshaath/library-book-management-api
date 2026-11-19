import express, { type ErrorRequestHandler } from "express";
import { bookRouter } from "./routes/bookRoutes.js";

export const app = express();
app.use(express.json());
app.use("/api/books", bookRouter);

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({ error: "Malformed JSON" });
    return;
  }
  console.error(error);
  response.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);
