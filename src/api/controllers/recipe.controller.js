const { createRecipe } = require('../services/recipe.service');

const createRecipeController = async (req, res, _next) => {
  const answerObject = await createRecipe(
    req.body.name, req.body.ingredients, req.body.preparation, req.headers.authorization,
    );
  return res.status(answerObject.status).json(answerObject.answer);
};

module.exports = {
  createRecipeController,
};