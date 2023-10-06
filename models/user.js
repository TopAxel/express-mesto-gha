const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => validator.isAlpha(value),
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => validator.isAlpha(value),
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
