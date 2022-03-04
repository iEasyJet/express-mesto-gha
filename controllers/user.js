const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
    });
};

const findUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(404).send({ message: 'Некорректное id пользователя' });
    })
    .then((user) => {
      res.send({ user });
    })
    .catch(() => {
      res.status(400).send({ message: 'Пользователь по указанному id не найден' });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ avatar: user.avatar });
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    });
};

module.exports = {
  getUsers,
  postUser,
  findUser,
  updateUser,
  updateAvatar,
};
