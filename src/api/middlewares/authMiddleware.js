const INVALID_TOKEN_MESSAGE = 'jwt malformed';
const MISSING_TOKEN_MESSAGE = 'missing auth token';

const authService = require('../services/authService');

const errorObjectCreator = (status, message) => ({
  status,
  answer: { message,
   },
});

const authMiddleware = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    // console.log('token', token);
    if (!token) {
      const answerObject = errorObjectCreator(401, MISSING_TOKEN_MESSAGE);
      return res.status(answerObject.status).json(answerObject.answer);
      } const tokenVerified = authService.verifyToken(token);
      // console.log('obj:', tokenVerified);
      if (!tokenVerified) {
        const answerObject = errorObjectCreator(401, INVALID_TOKEN_MESSAGE);
        return res.status(answerObject.status).json(answerObject.answer);
      }req.tokenData = tokenVerified.data;
      next();
  } catch (err) {
    console.error(err.massage);
    return res.status(401).json({ message: 'falha na autenticação' });
  }
};

module.exports = authMiddleware;