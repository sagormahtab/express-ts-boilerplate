import { db } from ".";

function createBooksTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      author TEXT NOT NULL
    );
  `);
  console.log("Table `books` created successfully.");
}

function insertDummyBooks() {
  const books = [
    {
      title: "1984",
      description: "A dystopian novel",
      author: "George Orwell",
    },
    {
      title: "To Kill a Mockingbird",
      description: "A novel about justice",
      author: "Harper Lee",
    },
    {
      title: "The Great Gatsby",
      description: "A novel about the American dream",
      author: "F. Scott Fitzgerald",
    },
    {
      title: "Henry Dick",
      description: "A novel about a great white whale",
      author: "Herman Melville",
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO books (title, description, author) VALUES (?, ?, ?)
  `);

  books.forEach((book) => {
    stmt.run(book.title, book.description, book.author);
  });

  console.log("Dummy books inserted successfully.");
}

function readBooks() {
  const stmt = db.prepare("SELECT * FROM books");
  const books = stmt.all();
  console.log("Books in the database:", books);
}

if (require.main === module) {
  createBooksTable();
  insertDummyBooks();
  readBooks();
}
