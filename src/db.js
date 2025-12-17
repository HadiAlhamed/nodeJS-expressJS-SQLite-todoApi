import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');

//USER table , TODOS table

db.exec(
  `
    CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username UNIQUE TEXT NOT NULL,
        password TEXT NOT NULL,
    )

`
);

db.exec(
  `
        CREATE TABLE IF NOT EXISTS todos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            task TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES user(id)
        )
    `
);

export default db;
