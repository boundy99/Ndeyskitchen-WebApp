const User = require('../database/models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
  USER_NOT_FOUND,
  USERS_NOT_FOUND,
  UNAUTHORIZED_REQUEST,
  PASSWORD_INCORRECT,
} = require('../errors');

async function createUser(req, res) {
  const { firstName, lastName, email, password, number } = req.body;
  bcrypt.hash(password, 11, async (error, hash) => {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        number,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
}

async function getUserCredentials(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ error: USER_NOT_FOUND });

  const id = user._id;
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(404).json({ error: PASSWORD_INCORRECT });

  try {
    const token = jwt.sign({ id: id }, process.env.JWT);
    return res
      .status(200)
      .cookie('token', token, { httpOnly: true, secure: true, maxAge: 8.64e7 })
      .json({ token: token });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function validateUser(req, res, next) {
  try {
    const userID = jwt.verify(req.headers.authorization, process.env.JWT);

    console.log(userID);
    const user = await User.findOne({ _id: userID.id });

    if (!user) return res.status(401).json({ error: UNAUTHORIZED_REQUEST });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401);
  }
}

async function getAllUsers(req, res) {
  const users = await User.find().sort();
  console.log(req.user);
  if (req.user) {
    if (!users) return res.status(404).json({ error: USERS_NOT_FOUND });
    return res.status(200).json(users);
  }

  return res.status(401).json({ error: UNAUTHORIZED_REQUEST });
}

const getUser = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: USER_NOT_FOUND });
  }

  const user = await User.findById(id);

  if (!user) return res.status(404).json({ error: USER_NOT_FOUND });

  res.status(200).json(user);
};

async function deleteUser(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: USER_NOT_FOUND });
  }

  try {
    const user = await User.deleteOne({ _id: id });
    if (!user) res.status(200).json({ mssg: 'Deletion Complete' });
  } catch (err) {
    res.status(200).json({ mssg: 'Deletion Incomplete' });
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserCredentials,
  validateUser,
};
