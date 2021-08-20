const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, console.log(`server started on port ${PORT}`));
