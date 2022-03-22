const {
  celebrate, Joi, Segments,
} = require('celebrate');

// eslint-disable-next-line no-useless-escape
const patternURL = /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/;

const userUpdateValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(40),
    about: Joi.string().optional().min(2).max(200),
  }),
});

const updateAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().regex(patternURL),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const postUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(40),
    about: Joi.string().optional().min(2).max(200),
    avatar: Joi.string().regex(patternURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const findUserValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});

const getUserInfoByIdValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required(),
  }),
});

const postCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().regex(patternURL).required(),
  }),
});

const cardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  userUpdateValidation,
  updateAvatarValidation,
  loginValidation,
  postUserValidation,
  findUserValidation,
  getUserInfoByIdValidation,
  postCardValidation,
  cardIdValidation,
};
