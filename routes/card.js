const router = require('express').Router();
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  removeLikeCard,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', postCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', removeLikeCard);

module.exports = router;
