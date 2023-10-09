const express = require('express');

const router = express.Router();

const users = require('./users');
const cards = require('./cards');

router.use('/users', users);
router.use('/cards', cards);
router.use('*', (req, res, next) => {
  res.status(404).send({ message: 'страница не найдена' });
  next();
});

module.exports = router;
