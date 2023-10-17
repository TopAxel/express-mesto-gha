const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
    validate: {
      validator: (value) => validator.isAlpha(value),
      message: 'Некорректное имя',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь океана',
    validate: {
      validator: (value) => validator.isAlpha(value),
      message: 'Некорректное описание',
    },
  },
  avatar: {
    type: String,
    default: 'https://s1.1zoom.ru/big7/888/Eyes_Owls_Bubo_502568.jpg',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Неверная ссылка на аватар',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'неверный адрес элетронной почты',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Неправильная почта или пароль');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnauthorizedError('Неправильная почта или пароль');
  }
  return user;
};

const User = mongoose.model('user', userSchema);
module.exports = User;
