const router = require('express').Router();
const {
  getUsers,
  postUser,
  findUser,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.post('/users', postUser);
router.get('/users/:userId', findUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
