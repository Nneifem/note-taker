const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3005;
const db = require('./db/db.json');

const app = express();

// // middleware to parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET for the homepage and the note section
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// POST the notes 
app.post('/api/notes', (req, res) => {
        const { title, text } = req.body;
        if (title && text){
            const newNote = {
                title,
                text,
            };

            fs.readFile('./db/db.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    let parsedNotes = JSON.parse(data);
                    console.log('parsedNotes', parsedNotes.length)
                    newNote.id = parsedNotes.length + 1;
                    parsedNotes.push(newNote);

                    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 3), (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('success!')
                    )
                }
            })
        }
});

app.listen(PORT, () => 
    console.log(`Note taker is ready at http://localhost:${PORT}`)
); 