const express = require('express');

const router = express.Router();
const users = require('./users');
const cards = require('./cards');

const NotFoundError = require('../errors/UnauthorizedError');

router.use('/users', users);
router.use('/cards', cards);
router.use('/*', (req, res, next) => next(new NotFoundError('страница не найдена')));

module.exports = router;
