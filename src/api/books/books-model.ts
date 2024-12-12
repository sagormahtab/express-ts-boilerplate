import { db } from "@config/db";
import { TCreateBook, TUpdateBook } from "./books-schema";

export const InsertBook = async (createBookDto: TCreateBook) => {
  const stmt = db.prepare(`
      INSERT INTO books (title, description, author)
      VALUES (?, ?, ?)
    `);
  const result = stmt.run(
    createBookDto.title,
    createBookDto.description || null,
    createBookDto.author
  );
  return result;
};

export const FindAllBooks = async () => {
  const stmt = db.prepare("SELECT * FROM books");
  const books = stmt.all();
  return books;
};

export const FindBook = async (id: number) => {
  const stmt = db.prepare("SELECT * FROM books WHERE id = ?");
  const book = stmt.get(id);
  return book;
};

export const UpdateBook = async (updateBookDto: TUpdateBook) => {
  const stmt = db.prepare(`
    UPDATE books
    SET title = ?, description = ?, author = ?
    WHERE id = ?
  `);
  const result = stmt.run(
    updateBookDto.title,
    updateBookDto.description || null,
    updateBookDto.author,
    updateBookDto.id
  );
  if (result.changes === 0) {
    return false;
  }
  return true;
};

export const RemoveBook = async (id: number) => {
  const stmt = db.prepare("DELETE FROM books WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return false;
  }
  return true;
};
