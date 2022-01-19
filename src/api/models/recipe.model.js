const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('recipes').insertOne({ 
    name,
    ingredients,
    preparation,
    userId,
   });
  return insertedId;
};

const find = async () => {
  const conn = await connect();
  const recipes = await conn.collection('recipes').find({ }).toArray();
  if (!recipes) return null;
  return recipes;
};

const findById = async (id) => {
  const conn = await connect();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null; 
}
  const recipe = await conn.collection('recipes').findOne(ObjectId(id));
  if (!recipe) return null;
  return recipe;
};

const updateById = async (id, name, ingredients, preparation) => {
  const conn = await connect();
  const { insertedId } = await
   conn.collection('recipes')
   .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return insertedId;
};

const deleteById = async (id) => {
  const conn = await connect();
  const { insertedId } = await
   conn.collection('recipes')
   .deleteOne({ _id: ObjectId(id) });
  return insertedId;
};

const uploadImage = async (id, path) => {
  const conn = await connect();
  const { insertedId } = await
   conn.collection('recipes')
   .updateOne({ _id: ObjectId(id) }, { $set: { image: path } });
  return insertedId;
};

module.exports = {
  create,
  find,
  findById,
  updateById,
  deleteById,
  uploadImage,
};