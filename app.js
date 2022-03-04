const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const process = require('process');
const res = require('express/lib/response');
const user = require('./routes/user');
const card = require('./routes/card');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '621d236c0517a6fe1ab9e319',
  };
  next();
});

app.use('/', user);
app.use('/', card);

app.use((req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
});
