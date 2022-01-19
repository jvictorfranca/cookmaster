 const {
   createRecipe, findRecipes,
    findRecipeById, updateRecipeByIdService, deleteRecipeByIdService, uploadImageService, 
  } = require('../services/recipe.service');

const createRecipeController = async (req, res, next) => {
  try {
    const answerObject = await createRecipe(
      req.body.name, req.body.ingredients, req.body.preparation, req.tokenData,
      );
    return res.status(answerObject.status).json(answerObject.answer);
  } catch (err) {
    console.error(err.answer.message);
    next(err);
  }
};

const findRecipesController = async (_req, res, next) => {
  try {
 const answerObject = await findRecipes();
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

const findRecipeByIdController = async (req, res, next) => {
  try {
 const { id } = req.params;
  const answerObject = await findRecipeById(id);
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

const updateRecipeByIdController = async (req, res, next) => {
  try {
 const { id } = req.params;
  const recipeOBJ = req.body;
  
  const answerObject = await updateRecipeByIdService( 
    id, recipeOBJ, req.tokenData,
    );
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

const deleteRecipeByIdController = async (req, res, next) => {
  try {
 const { id } = req.params;
  
  const answerObject = await deleteRecipeByIdService( 
    id, req.tokenData,
    );
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

const uploadImageController = async (req, res, next) => {
  try {
 const { id } = req.params;
  // console.log(req.file);
  // console.log('id:', id);
  const imagePath = `localhost:3000/src/uploads/${id}.jpeg`;
  // console.log('path:', imagePath);
  const answerObject = await uploadImageService( 
    id, req.tokenData, imagePath,
    );
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

module.exports = {
  createRecipeController,
  findRecipesController,
  findRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  uploadImageController,
};