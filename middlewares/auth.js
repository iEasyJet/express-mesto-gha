const jwt = require('jsonwebtoken');
const CRYPTO_KEY = require('../config/config');
const Unauthorized = require('../errors/Unauthorized');

const auth = (res, req, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, CRYPTO_KEY);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};

module.exports = auth;
