const express = require('express');
const notes = require('./data/notes');

const app = express();

app.get('/', (req, res) => {
  res.send('Api is running');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((item) => item._id === req.params.id);
  res.json(note);
});

app.listen(5000, console.log('server started on port 5000'));
