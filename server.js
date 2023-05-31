const express = require('express');

const PORT = 7007;
const db = require('./db/db.json');

const app = express();

// middleware to parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET requests for notes