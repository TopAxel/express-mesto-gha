/* eslint-disable consistent-return */
const Card = require('../models/card');

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      return res.status(404).json({ error: 'Карточка не найдена' });
    }
    res.status(200).json({ error: 'Карточка удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка по умолчанию.' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(404).json({ error: 'Передан несуществующий _id карточки.' });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка по умолчанию.' });
  }
};

const unlikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res.status(404).json({ error: 'Передан несуществующий _id карточки.' });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка по умолчанию.' });
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
