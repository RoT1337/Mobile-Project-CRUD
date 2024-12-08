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
  const { name, description, category, frequency } = req.body;

  if (!name || !category || !frequency) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  console.log(`Attempting to add habit: ${user}, ${description}, ${category}, ${frequency}`);

  db.run('INSERT INTO habits (name, description, category, frequency) VALUES (?, ?, ?, ?)', [name, description, category, frequency], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('Habit added with name:', name); // Check properly and look at lines 39 & 40
  });
}

exports.getCategory = (req, res) => {
  const { category } = req.body;
  console.log(`Looking for category: ${category}`);

  db.get(`SELECT category FROM habits WHERE category = ?`, [category], (err, row) => {
    if (err) {
      console.error(`Error finding category: `, err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      console.log(`Found category `, category);
      res.json({ message: 'Grabbed Category' });
    } else {
      console.log('Failed to grab category:', category);
      res.status(404).json({ error: 'Category not found' });
    }
  });
}

exports.getFrequency = (req, res) => {
  const { frequency } = req.body;
  console.log(`Checking for frequency: ${frequency}`);

  db.get(`SELECT frequency FROM habits WHERE frequency = ?`, [frequency], (err, row) => {
    if (err) {
      console.error(`Error finding frequency: `, err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      console.log(`Found frequency `, frequency);
      res.json({ message: 'Grabbed Frequency' });
    } else {
      console.log('Failed to grab frequency:',frequency);
      res.status(404).json({ error: 'Frequency not found' });
    }
  });
}

exports.getHabit = (req, res) => {
  const { habit } = req.body;
  
  db.get(`SELECT name FROM habits WHERE name = ?`, [habit], (err, row) => {
    if (err) {
      console.error(`Error finding frequency: `, err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({ message: 'Grabbed Habit' });
    } else {
      res.status(404).json({ error: 'Habit not found' });
    }
  });
}