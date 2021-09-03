// this module will have CRUD operations on /api/user route
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists...');
  }

  // if user doesn't exists, create new user
  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (newUser) {
    // if new user created successfully
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      pic: newUser.pic,
    });
  } else {
    res.status(400);
    throw new Error('Something went wrong ... ');
  }

  //   res.json({
  //     name: name,
  //     email: email,
  //   });
});

// login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if user is present, it will also match password
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    // if user is not present, throw error
    res.status(400);
    throw new Error('invalid credentials...');
  }
});

module.exports = { registerUser, authUser };
