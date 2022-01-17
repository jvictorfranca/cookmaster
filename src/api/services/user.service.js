const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const EMAIL_REGISTERED_MESSAGE = 'Email already registered';

const { create, findByEmail } = require('../models/user.model');

const errorObjectCreator = (status, message) => ({
  status,
  answer: { message,
   },
});

const checkValid = (name, email, password) => {
  if (!name) { return true; }
  if (!email) { return true; }
  if (!password) { return true; }
  return false;
};

const checkEmailValid = (email) => {
  if (!email.includes('@') || !email.includes('.com')) { return true; }
  return false;
};

const checkCredentials = (name, email, password) => {
  if (checkValid(name, email, password)) { return true; }
  if (checkEmailValid(email)) { return true; }
  return false;
};

const createUser = async (name, email, password) => {
  if (checkCredentials(name, email, password)) {
 return errorObjectCreator(400, INVALID_ENTRIES_MESSAGE);
} if ((await findByEmail(email))) {
    return errorObjectCreator(409, EMAIL_REGISTERED_MESSAGE);
  }
   const createdId = await create(name, email, password);
  const createdProduct = {
    _id: createdId, name, email, role: 'user',
  };
  return { answer: { user: createdProduct }, status: 201,
  };
};

module.exports = {
  createUser,
};