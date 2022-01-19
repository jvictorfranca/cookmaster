 const {
   createRecipe, findRecipes,
    findRecipeById, updateRecipeByIdService, deleteRecipeByIdService, uploadImageService, 
  } = require('../services/recipe.service');

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

const updateRecipeByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const recipeOBJ = req.body;
  
  const answerObject = await updateRecipeByIdService( 
    id, recipeOBJ, req.headers.authorization,
    );
  return res.status(answerObject.status).json(answerObject.answer);
};

const deleteRecipeByIdController = async (req, res, _next) => {
  const { id } = req.params;
  
  const answerObject = await deleteRecipeByIdService( 
    id, req.headers.authorization,
    );
  return res.status(answerObject.status).json(answerObject.answer);
};

const uploadImageController = async (req, res, _next) => {
  const { id } = req.params;
  console.log(req.file);
  console.log('id:', id);
  const imagePath = `localhost:3000/src/uploads/${id}.jpeg`;
  console.log('path:', imagePath);
  const answerObject = await uploadImageService( 
    id, req.headers.authorization, imagePath,
    );
  return res.status(answerObject.status).json(answerObject.answer);
};

module.exports = {
  createRecipeController,
  findRecipesController,
  findRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  uploadImageController,
};