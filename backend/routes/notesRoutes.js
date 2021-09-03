const express = require('express');
const router = express.Router();
const notes = require('../data/notes');

router.get('/', (req, res) => {
  res.json(notes);
});

router.get('/:id', (req, res) => {
  const note = notes.find((item) => item._id === req.params.id);
  res.json(note);
});

module.exports = router;
