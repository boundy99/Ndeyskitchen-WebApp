const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    password: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    order: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
