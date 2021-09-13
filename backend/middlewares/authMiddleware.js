const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // verifying the token sent by user
      token = req.headers.authorization.split(' ')[1];

      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // at this point req object has user id
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('not authorized, no token');
  }
});

module.exports = { protect };
