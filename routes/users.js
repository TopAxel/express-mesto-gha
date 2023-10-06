const express = require('express');

const router = express.Router();
const users = require('../controllers/users');

router.get('/', users.getUsers);
router.get('/:userId', users.getUserById);
router.post('/', users.createUser);
router.patch('/me', users.updateProfile);
router.patch('/me/avatar', users.updateAvatar);

module.exports = router;
