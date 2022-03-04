const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  about: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
