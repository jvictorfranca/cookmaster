const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const INVALID_TOKEN_MESSAGE = 'jwt malformed';

const { create, find, findById } = require('../models/recipe.model');
const { verifyToken } = require('./authService');

const errorObjectCreator = (status, message) => ({
  status,
  answer: { message,
   },
});

const checkValid = (name, ingredients, preparation) => {
  if (!name) { return true; }
  if (!ingredients) { return true; }
  if (!preparation) { return true; }
  return false;
};

const createRecipe = async (name, ingredients, preparation, token) => {
  if (checkValid(name, ingredients, preparation)) {
 return errorObjectCreator(400, INVALID_ENTRIES_MESSAGE);
}
const tokenVerified = verifyToken(token);
if (!token || !tokenVerified) {
  return errorObjectCreator(401, INVALID_TOKEN_MESSAGE);
}
const userId = tokenVerified.data.id;
const createdId = await create(name, ingredients, preparation, userId);
  const createdRecipe = {
    _id: createdId, name, preparation, ingredients, userId,
  };
  return { answer: { recipe: createdRecipe }, status: 201,
  };
};

const findRecipes = async () => {
  const recipes = await find();
  if (!recipes) { return { answer: { message: 'Not Found' }, status: 404 }; }
  return { answer: recipes, status: 200 };
};

const findRecipeById = async (id) => {
  const recipe = await findById(id);
  if (!recipe) { return { answer: { message: 'recipe not found' }, status: 404 }; }
  return { answer: recipe, status: 200 };
};

module.exports = {
  createRecipe,
  findRecipes,
  findRecipeById,
};