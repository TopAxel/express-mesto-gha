const Card = require('../models/card');
const { OK } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.deleteOne({ _id: cardId })
          .then(() => res.status(OK).send(card));
      }
      throw new ForbiddenError('В доступе отказано');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      } else {
        next(err);
      }
    });
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Передан несуществующий _id карточки.');
  })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      }
      next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
