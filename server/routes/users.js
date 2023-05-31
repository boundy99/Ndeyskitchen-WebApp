const express = require('express');
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserCredentials,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);

router.post('/user', getUserCredentials);

router.get('/:id', getUser);

router.get('/', getAllUsers);

router.delete('/:id', deleteUser);

module.exports = router;
