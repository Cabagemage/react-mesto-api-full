const express = require('express');
const app = express();
const router = require('express').Router();

const userRouter = require('./users.js')
const cardsRouter = require('./cards.js')
const { requestLogger, errorLogger } = require('../middlewares/logger');

app.use(requestLogger)
router.use('/users', userRouter);
router.use('/cards', cardsRouter);


router.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Страницы не существует' });
  next();
});
app.use(errorLogger);

module.exports = router;