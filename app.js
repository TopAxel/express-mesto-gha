/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '652028410787b8485dfd235e', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

// роут
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
