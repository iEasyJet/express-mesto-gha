const router = require('express').Router();
const {
  userUpdateValidation,
  updateAvatarValidation,
  findUserValidation,
  getUserInfoByIdValidation,
} = require('../middlewares/validation');
const {
  getUsers,
  findUser,
  updateUser,
  updateAvatar,
  getUserInfoById,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userId', findUserValidation, findUser);
router.patch('/users/me', userUpdateValidation, updateUser);
router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);
router.get('/users/me', getUserInfoByIdValidation, getUserInfoById);

module.exports = router;
