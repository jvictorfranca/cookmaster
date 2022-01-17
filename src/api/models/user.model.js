// const { ObjectId } = require('mongodb');
// const mongoose = require('mongoose');
const connect = require('./connection');

const create = async (name, email, password) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('users').insertOne({ 
    name,
    email,
    password,
    role: 'user',
   });
  return insertedId;
};

const findByEmail = async (email) => {
  const conn = await connect();
  const user = await conn.collection('users').findOne({ email });
  if (!user) return null;
  return user;
};

const isUserInvalid = (user) => {
  if (!user) { return true; }
  if (!user.email || !user.password) { return true; }
  return false;
}; 

const checkLogin = async (email, password) => {
  const user = await findByEmail(email);
  if (isUserInvalid(user)) { return false; }
  if (user.email === email && user.password === password) { return true; }
  return false;
};

module.exports = {
  create,
  findByEmail,
  checkLogin,
};