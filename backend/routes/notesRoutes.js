// * api/notes/*

const express = require('express');
const {
  getNotes,
  createNotes,
  getNoteById,
  updateNote,
  deleteNote,
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

router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createNotes);
router
  .route('/:id')
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;

// refer below link for more info on router.route
// http://expressjs.com/en/5x/api.html#router.route
