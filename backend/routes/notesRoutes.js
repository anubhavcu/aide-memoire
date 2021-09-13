// * api/notes/*

const express = require('express');
const {
  getNotes,
  createNotes,
  getNoteById,
  updateNote,
} = require('../controllers/notesController');
const router = express.Router();
const notes = require('../data/notes');
const { protect } = require('../middlewares/authMiddleware');

// router.get('/', (req, res) => {
//   res.json(notes);
// });

// router.get('/:id', (req, res) => {
//   const note = notes.find((item) => item._id === req.params.id);
//   res.json(note);
// });

router.get('/', protect, getNotes);
router.post('/create', protect, createNotes);
// router.get('/:id', getNoteById).put(protect, updateNote);
router.route('/:id').get(getNoteById).put(protect, updateNote);
// .put().delete()

module.exports = router;

// refer below link for more info on router.route
// http://expressjs.com/en/5x/api.html#router.route
