const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('user route hit !');
});

module.exports = router;
