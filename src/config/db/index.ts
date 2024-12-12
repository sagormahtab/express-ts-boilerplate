import Database from "better-sqlite3";

export const db = new Database("database.db", { verbose: console.log });
db.pragma("journal_mode = WAL");
