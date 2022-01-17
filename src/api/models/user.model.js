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
  const product = await conn.collection('users').findOne({ email });
  if (!product) return null;
  return product;
};

module.exports = {
  create,
  findByEmail,
};