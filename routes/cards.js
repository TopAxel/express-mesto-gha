const express = require('express');

const router = express.Router();
const cards = require('../controllers/cards');

router.get('/cards', cards.getAllCards);
router.post('/cards', cards.createCard);
router.delete('/cards/:cardId', cards.deleteCard);
router.put('/:cardId/likes', cards.likeCard);
router.delete('/:cardId/likes', cards.unlikeCard);

module.exports = router;
