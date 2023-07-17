import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

let db: Database;

export async function getDB(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: './urls.db',
      driver: sqlite3.Database,
    });
    await db.run(
      'CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, original TEXT);'
    );
  }
  return db;
}

export async function shortenUrl(original: string): Promise<string> {
  const db = await getDB();

  const result = await db.run('INSERT INTO url (original) VALUES (?)', original);
  const id = result.lastID;
  const short = `http://localhost:3333/s/${id}`;

  return short;
}

export async function lookupUrl(id: number): Promise<string> {
  const db = await getDB();

  const result = await db.get('SELECT original FROM url WHERE id = ?', id);
  const original = result.original;

  return original;
}
