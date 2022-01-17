const jwt = require('jsonwebtoken');

const API_SECRET = 'GNE1UI64AO3G1N';
const JWT_CONFIG = {
  expiresIn: 60,
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    return decoded;
  } catch (err) {
    console.log('Falha na verificação');
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken,
};