const User = require('../database/models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const createUser = async (req, res) => {
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
};

const getAllUsers = async (req, res) => {
  const users = await User.find().sort();

  if (!users) return res.status(404).json({ error: 'Users not found' });
  return res.status(200).json(users);
};

const getUser = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = await User.findById(id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    const user = await User.deleteOne({ _id: id });
    if (!user) res.status(200).json({ mssg: 'Deletion Complete' });
  } catch (err) {
    res.status(200).json({ mssg: 'Deletion Incomplete' });
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
};
