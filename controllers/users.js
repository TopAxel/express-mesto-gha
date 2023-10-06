/* eslint-disable consistent-return */
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка по умолчанию.' });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: ' Пользователь по указанному _id не найден.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка по умолчанию.' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Переданы некорректные данные при создании пользователя.' });
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(userId, { name, about }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь с указанным _id не найден.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка по умолчанию.' });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь с указанным _id не найден.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка по умолчанию.' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
