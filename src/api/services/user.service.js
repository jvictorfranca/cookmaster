const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const EMAIL_REGISTERED_MESSAGE = 'Email already registered';
const FIELDS_FILLED_MESSAGE = 'All fields must be filled';
const INCORRECT_FIELDS_MESSAGE = 'Incorrect username or password';

const { create, findByEmail, checkLogin } = require('../models/user.model');
const { genToken } = require('./authService');

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

const loginUser = async (email, password) => {
  const checked = await checkLogin(email, password);
  if (!email || !password) { return errorObjectCreator(401, FIELDS_FILLED_MESSAGE); }
  if (!checked) { return errorObjectCreator(401, INCORRECT_FIELDS_MESSAGE); }
  const user = await findByEmail(email);
  const { _id: id } = user; 
  // console.log(user);
  const payload = {
    id,
    role: user.role,
    email: user.email,
  };
  // console.log(payload);
  return { answer: { token: genToken(payload) }, status: 200 };
};

module.exports = {
  createUser,
  loginUser,
};