const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию.' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then((cards) => {
    if (!cards) {
      return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
    } return res.send({ data: cards });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при удалении карточки' });
    } return res.status(500).send({ message: 'Ошибка по умолчанию.' });
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((cards) => {
    if (!cards) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
    } return res.send({ data: cards });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию.' });
  });

const unlikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((cards) => {
    if (!cards) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
    } return res.send({ data: cards });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию.' });
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
