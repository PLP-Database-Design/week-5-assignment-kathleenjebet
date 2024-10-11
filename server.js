// express framework for handling requests
const express = require('express');
const app = express();

// http framework for handling requests
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

// connect to database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) return console.log('Error connecting to MySQL:', err);

  console.log("Connected to MySQL as ID:", db.threadId);
});

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1: Get all patients
app.get('/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving patients');
    } 
    res.render('data', { results: results });
  });
});

// Question 2: Get all providers
app.get('/providers', (req, res) => {
  db.query('SELECT * FROM providers', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving providers');
    } 
    res.render('data', { results: results });
  });
});

// Question 3: Get all patients again (assuming different use-case or example)
app.get('/patients/all', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving patients');
    } 
    res.render('data', { results: results });
  });
});

// Question 4: Get providers by specialty (using a query parameter)
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty; // Get specialty from the URL parameter
  db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving providers by specialty');
    } 
    res.render('data', { results: results });
  });
});

// Server setup
const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Sending a message to the browser');

  app.get('/', (req, res) => {
    res.send('Server started successfully');
  });
});

console.log(process.env.DB_HOST); // This should print your DB_HOST value
