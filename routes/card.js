const router = require('express').Router();
const {
  postCardValidation,
  deleteCardValidation,
  likeCardValidation,
  removeLikeCardValidation,
} = require('../middlewares/validation');
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  removeLikeCard,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', postCardValidation, postCard);
router.delete('/cards/:cardId', deleteCardValidation, deleteCard);
router.put('/cards/:cardId/likes', likeCardValidation, likeCard);
router.delete('/cards/:cardId/likes', removeLikeCardValidation, removeLikeCard);

module.exports = router;
