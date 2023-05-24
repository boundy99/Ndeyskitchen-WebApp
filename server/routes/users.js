const express = require("express");
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);

router.get("/:id", getUser);

router.get("/", getAllUsers);

router.delete("/:id", deleteUser);

module.exports = router;
