const express = require('express');
const path = require('path');

const PORT = 3007;
const noteDb = require('./db/db.json');

const app = express();

// // middleware to parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => 
    console.log(`Note taker is ready at http://localhost:${PORT}`)
); 