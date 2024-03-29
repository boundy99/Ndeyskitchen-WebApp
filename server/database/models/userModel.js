const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    password: { type: String, default: 'N/A', maxlength: 100 },
    number: { type: String, unique: true, sparse: true, maxlength: 20 },
    countryCode: { type: String, maxlength: 4 },
    sub: {
      type: String,
      required: false,
      unique: true,
      maxlength: 100,
      sparse: true,
    },
    residence: { type: String, maxlength: 50 },
    token: { type: String, default: 'N/A', maxlength: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
