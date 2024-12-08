const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created successfully.');
    }
  });

  db.run(
    `CREATE TABLE IF NOT EXISTS habits (
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0
    )`, (err) => {
    if (err) {
      console.error('Error creating habits table:', err.message);
    } else {
      console.log('Habits table created successfully.');
    }
  });

  db.run(
    `ALTER TABLE habits ADD COLUMN progress INTEGER NOT NULL DEFAULT 0`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding progress column:', err.message);
    } else {
      console.log('Progress column added successfully.');
    }
  });

  db.run(
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_habits_name ON habits (name)`, (err) => {
    if (err) {
      console.error('Error adding unique constraint to name column:', err.message);
    } else {
      console.log('Unique constraint added to name column successfully.');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing the database connection:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});