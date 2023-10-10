const express = require('express');

const router = express.Router();

const users = require('./users');
const cards = require('./cards');

const { NOT_FOUND } = require('../utils/constants');

router.use('/users', users);
router.use('/cards', cards);
router.use('*', (req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'страница не найдена' });
  next();
});

module.exports = router;
