// this module serves routes for '/api/users/'
const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

// router.get('/', (req, res) => console.log('/api/users route hit '))

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/profile').post(protect, updateUserProfile);

module.exports = router;
