// this module serves routes for '/api/users/'
const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userControllers');

// router.get('/', (req, res) => console.log('/api/users route hit '))

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
