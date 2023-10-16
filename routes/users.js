const express = require('express');

const router = express.Router();
const users = require('../controllers/users');
const {
  validationUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validations');

router.get('/', users.getUsers);
router.get('/me', users.getCurrentUser);
router.get('/:userId', validationUserId, users.getUserById);
router.patch('/me', validationUpdateProfile, users.updateProfile);
router.patch('/me/avatar', validationUpdateAvatar, users.updateAvatar);

module.exports = router;
