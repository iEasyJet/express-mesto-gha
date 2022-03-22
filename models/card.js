const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: () => 'Неверный формат ссылки на изображение',
    },
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
