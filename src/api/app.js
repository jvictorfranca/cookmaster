const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const { createUserController } = require('./controllers/user.controller');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
app.post('/users', createUserController);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
