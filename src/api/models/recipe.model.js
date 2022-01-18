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

module.exports = {
  create,
};