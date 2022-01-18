const { createRecipe, findRecipes, findRecipeById } = require('../services/recipe.service');

const createRecipeController = async (req, res, _next) => {
  const answerObject = await createRecipe(
    req.body.name, req.body.ingredients, req.body.preparation, req.headers.authorization,
    );
  return res.status(answerObject.status).json(answerObject.answer);
};

const findRecipesController = async (_req, res, _next) => {
  const answerObject = await findRecipes();
  return res.status(answerObject.status).json(answerObject.answer);
};

const findRecipeByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const answerObject = await findRecipeById(id);
  return res.status(answerObject.status).json(answerObject.answer);
};

module.exports = {
  createRecipeController,
  findRecipesController,
  findRecipeByIdController,
};