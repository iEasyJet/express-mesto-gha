const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка по-умолчанию' }));
};

const postCard = (req, res) => {
  console.log(req.user._id);
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
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      res.status(404).send({ message: 'Передан несуществующий _id карточки' });
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      res.status(400).send({ message: 'Карточка с указанным _id не найдена' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(404).send({ message: 'Передан несуществующий _id карточки' });
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      res.status(400).send({ message: 'Произошла ошибка' });
    });
};

const removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(404).send({ message: 'Передан несуществующий _id карточки' });
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      res.status(400).send({ message: 'Передан несуществующий _id карточки' });
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  removeLikeCard,
};
