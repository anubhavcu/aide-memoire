const expressAsyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

module.exports = { getNotes };
