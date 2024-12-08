const express = require('express');
const userController = require('./controllers/userController');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/habits', userController.addHabit);
app.get('/habits', userController.getAllHabit);
app.post('/habits/category', userController.getCategory);
app.post('/habits/time', userController.getTime);
app.post('/habits/name', userController.getHabit);
app.put('/habits', userController.updateHabit); 
app.delete('/habits', userController.deleteHabit); 

module.exports = app;