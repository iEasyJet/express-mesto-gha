const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const likes = [];

  Card.create(
    {
      name, link, owner, likes,
    },
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError({ message: 'Переданы неккоретные данные' }));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      next(new NotFoundError({ message: 'Карточка с указанным _id не найдена' }));
    })
    .then((card) => {
      if (req.user._id !== card.owner) {
        next(new Forbidden({ message: 'Нет прав на удаление карточки' }));
      }
      card.remove();
      res.send({ data: 'Карточка удалена успешно!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError({ message: 'Переданы неккоретные данные' }));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError({ message: 'Карточка с указанным _id не найдена' }));
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError({ message: 'Переданы неккоретные данные' }));
      } else {
        next(err);
      }
    });
};

const removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError({ message: 'Карточка с указанным _id не найдена' }));
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError({ message: 'Переданы неккоретные данные' }));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  removeLikeCard,
};
