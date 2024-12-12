import { Request, Response } from "express";
import { z } from "zod";
import {
  InsertBook,
  FindAllBooks,
  FindBook,
  UpdateBook,
  RemoveBook,
} from "./books-model";
import { CreateBookSchema, UpdateBookSchema } from "./books-schema";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof z.ZodError) {
    return JSON.stringify(error.errors);
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const createBookDto = CreateBookSchema.parse(req.body);
    const result = await InsertBook(createBookDto);
    res
      .status(201)
      .json({ message: "Book created successfully", data: result });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await FindAllBooks();
    res.status(200).json({ data: books });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const book = await FindBook(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updateBookDto = UpdateBookSchema.parse({
      ...req.body,
      id: parseInt(req.params.id),
    });
    const success = await UpdateBook(updateBookDto);

    if (!success) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const success = await RemoveBook(id);
    if (!success) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
