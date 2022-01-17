const { createUser } = require('../services/user.service');

const createUserController = async (req, res, _next) => {
  const answerObject = await createUser(req.body.name, req.body.email, req.body.password);
  return res.status(answerObject.status).json(answerObject.answer);
};

module.exports = {
  createUserController,
};