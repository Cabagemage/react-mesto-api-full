require('dotenv').config();
const jwt = require('jsonwebtoken');
const BadRequest = require('../utils/Errors/BadRequest');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadRequest('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new BadRequest('Необходима авторизация');
  }

  req.user = payload;

  next();
};
