const db = require('../models/database');

exports.getAllUsers = (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

exports.getAllHabit = (req, res) => {
  db.all('SELECT * FROM habits', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

exports.addUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  console.log(`Attempting to add user: ${name}, ${email}, ${password}`); 

  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function (err) {
    if (err) {
      console.error('Error adding user:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('User added successfully with ID:', this.lastID);
    res.status(201).json({ id: this.lastID });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log(`Attempting to login user: ${email}`);

  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      console.error('Error logging in user:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      console.log('Login successful for user:', email);
      console.log('Retrieved user:', row);
      res.json({ message: 'Login successful', user: row });
    } else {
      console.log('Login failed for user:', email);
      res.status(404).json({ error: 'User not found' });
    }
  });
}

exports.addHabit = (req, res) => {
  const { name, description, category, date, time, progress } = req.body;

  if (!name || !category || !date || !time || progress === undefined) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  console.log(`Attempting to add habit: ${name}, ${description}, ${category}, ${date}, ${time}, ${progress}`);

  db.run('INSERT INTO habits (name, description, category, date, time, progress) VALUES (?, ?, ?, ?, ?, ?)', [name, description, category, date, time, progress], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: 'Habit name must be unique' });
      } else {
        res.status(500).json({ error: err.message });
      }
      return;
    }
    console.log('Habit added with name:', name);
    res.status(201).json({ id: this.lastID });
  });
};

exports.getCategory = (req, res) => {
  const { category } = req.body;
  console.log(`Looking for category: ${category}`);

  db.all('SELECT * FROM habits WHERE category = ?', [category], (err, rows) => {
    if (err) {
      console.error('Error finding category:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (rows.length > 0) {
      console.log('Found category:', category);
      res.json({ message: 'Grabbed Category', habits: rows });
    } else {
      console.log('Failed to grab category:', category);
      res.status(404).json({ error: 'Category not found' });
    }
  });
};

exports.getTime = (req, res) => {
  const { time } = req.body;
  console.log(`Checking for time: ${time}`);

  db.all('SELECT * FROM habits WHERE time = ?', [time], (err, rows) => {
    if (err) {
      console.error('Error finding time:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (rows.length > 0) {
      console.log('Found time:', time);
      res.json({ message: 'Grabbed Time', habits: rows });
    } else {
      console.log('Failed to grab time:', time);
      res.status(404).json({ error: 'Time not found' });
    }
  });
};

exports.getHabit = (req, res) => {
  const { habit } = req.body;
  
  db.get('SELECT * FROM habits WHERE name = ?', [habit], (err, row) => {
    if (err) {
      console.error('Error finding habit:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({ message: 'Grabbed Habit', habit: row });
    } else {
      res.status(404).json({ error: 'Habit not found' });
    }
  });
};

exports.updateHabit = (req, res) => {
  const { name, description, category, date, time, progress } = req.body;

  if (!name || !category || !date || !time || progress === undefined) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  console.log(`Attempting to update habit: ${name}, ${description}, ${category}, ${date}, ${time}, ${progress}`);

  db.run('UPDATE habits SET description = ?, category = ?, date = ?, time = ?, progress = ? WHERE name = ?', [description, category, date, time, progress, name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('Habit updated with name:', name);
    res.status(200).json({ message: 'Habit updated successfully' });
  });
};

exports.deleteHabit = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Habit name is required' });
    return;
  }

  console.log(`Attempting to delete habit with name: ${name}`);

  db.run('DELETE FROM habits WHERE name = ?', [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('Habit deleted with name:', name);
    res.status(200).json({ message: 'Habit deleted successfully' });
  });
};