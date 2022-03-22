const router = require('express').Router();
const {
  postCardValidation,
  cardIdValidation,
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
router.delete('/cards/:cardId', cardIdValidation, deleteCard);
router.put('/cards/:cardId/likes', cardIdValidation, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidation, removeLikeCard);

module.exports = router;
