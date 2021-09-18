// this module will have CRUD operations on /api/user route
const asyncHandler = require('express-async-handler');
const { db } = require('../models/userModel');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

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
      token: generateToken(newUser._id),
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
      token: generateToken(user._id),
    });
    console.log('user logged in ...');
  } else {
    // if user is not present, throw error
    res.status(401);
    // console.log('error thrown , invalid credentials ');
    throw new Error('invalid credentials...');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // id is attached to req object by authMiddleware's protect method(as this route is going to call it first)
  // req.user = {_id:..... }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    // if password is entered then only set
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found...');
  }
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user);
    await user.remove();
    res.json('user profile deleted successfully... ');
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message || 'Error while deleting user...' });
  }
});

module.exports = { registerUser, authUser, updateUserProfile, deleteUser };
