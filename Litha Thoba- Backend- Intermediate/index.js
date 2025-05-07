// JavaScript source code
//declare 
const express = require('express'); //middleware, a function to install express
const bodyParser = require('body-parser'); //middleware, a function to install body-parser
const app = require('express')(); //a function to install express
const PORT = 5050;

//declare variable 'note' and create an array of default notes
let notes = [];

//calling the express and body-parser functions 
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//serving static files
app.use(express.static('public'));

//fetch all notes
app.get('/api/notes', (req, res) => {  //set up a route for the get function
    res.json(notes);
});

//allow users to post notes 
app.post('/api/notes', (req, res) => {
    const { title, body } = req.body; //request is made to /api/notes url
    const newNote = {
        //assign a note id to each individual note using math.random
        id: Math.random() * 100,
        title: title || "Untitled Note", //default title if none is provided
        body: body || "", //default body if none is written
        tag: tag || null //if none is provided 
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

//lets the user edit and update notes
app.put('/api/notes/:id', (req, res) => {
    const noteId = Number(req.params.id);
    const { title, body } = req.body;

    const note = notes.find(n => n.id === noteId);
    if (note) {
        note.title = title;
        note.body = body;
        res.json(note);
    } else {
        res.status(404).send({ message: 'Note not found' });
    }
});

//allows users to delete notes
app.delete('/api/notes/:id', (req, res) => {
    const noteId = Number(req.params.id);
    notes = notes.filter(note => note.id !== noteId);
    res.status(204).send();
});

//stays at the bottom to prevent issues or errors
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

