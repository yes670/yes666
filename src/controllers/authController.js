
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    username,
    email,
    password
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    res.json({ token });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

module.exports = { registerUser, loginUser };
