const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, CRYPTO_KEY } = require('../config/config');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const Unauthorized = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      next(err);
    });
};

const postUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res.send({ data: user });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы неккоретные данные'));
      } else if (err.code === 11000) {
        next(new CastError('Пользователь с такой почтой уже существует'));
      } else {
        next(err);
      }
    });
};

const findUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(new NotFoundError('Нет пользователя с переданным id'));
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы неккоретные данные'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, CRYPTO_KEY, { expiresIn: '7d' });
      res.send(token);
    })
    .catch((err) => {
      if (err.name === 'Unauthorized') {
        next(new Unauthorized('Переданы неправильные почта или пароль'));
      } else {
        next(err);
      }
    });
};

const getUserInfoById = (req, res, next) => {
  const { id } = req.user._id;
  User.findById(id)
    .orFail(() => {
      next(new NotFoundError('Нет пользователя с переданным id'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы неккоретные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  postUser,
  findUser,
  updateUser,
  updateAvatar,
  login,
  getUserInfoById,
};
