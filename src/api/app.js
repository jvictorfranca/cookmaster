const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer(storage);

const {
   createRecipeController,
   findRecipesController,
   findRecipeByIdController,
   updateRecipeByIdController,
   deleteRecipeByIdController,
   uploadImageController, 
  } = require('./controllers/recipe.controller');
const { createUserController, loginUserController } = require('./controllers/user.controller');
const authMiddleware = require('./middlewares/authMiddleware');

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
app.post('/recipes', authMiddleware, createRecipeController);
app.put('/recipes/:id/image/', authMiddleware, upload.single('image'), uploadImageController);

app.get('/recipes', findRecipesController);
app.get('/recipes/:id', findRecipeByIdController);

app.put('/recipes/:id', authMiddleware, updateRecipeByIdController);

app.delete('/recipes/:id', authMiddleware, deleteRecipeByIdController);

module.exports = app;
