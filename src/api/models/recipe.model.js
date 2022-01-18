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

module.exports = {
  create,
  find,
};