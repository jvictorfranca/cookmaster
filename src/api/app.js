const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const {
   createRecipeController,
   findRecipesController,
   findRecipeByIdController, 
  } = require('./controllers/recipe.controller');
const { createUserController, loginUserController } = require('./controllers/user.controller');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUserController);
app.post('/login', loginUserController);
app.post('/recipes', createRecipeController);

app.get('/recipes', findRecipesController);
app.get('/recipes/:id', findRecipeByIdController);

module.exports = app;
