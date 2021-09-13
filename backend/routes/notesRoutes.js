// * api/notes/*

const express = require('express');
const { getNotes } = require('../controllers/notesController');
const router = express.Router();
const notes = require('../data/notes');
const { protect } = require('../middlewares/authMiddleware');

// router.get('/', (req, res) => {
//   res.json(notes);
// });

router.get('/:id', (req, res) => {
  const note = notes.find((item) => item._id === req.params.id);
  res.json(note);
});

router.get('/', protect, getNotes);
// router.post("/create")
// router.route("/:id").get().put().delete()

module.exports = router;
