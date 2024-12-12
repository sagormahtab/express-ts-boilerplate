import express from "express";
import {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} from "./books-controller";

const router = express.Router();

router.post("/", createBook);

router.get("/", getAllBooks);

router.get("/:id", getBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
