const expressAsyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

// get all notes
const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

// create note
const createNotes = expressAsyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please fill in all fields..');
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

// fetch single note
const getNoteById = expressAsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found...' });
  }
});

const updateNote = expressAsyncHandler(async (req, res) => {
  const { title, content, cotegory } = req.body;

  const note = await Note.findById(req.params.id);

  // checking if the note belongs to the user logged in
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('You cannot perform this action...');
  }

  // if the id is correct  then update
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await Note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not found ... ');
  }
});

module.exports = { getNotes, createNotes, getNoteById, updateNote };
