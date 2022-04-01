require('dotenv').config();

const products = require('./products');
const reviews = require('./reviews');
const cart = require('./cart');
const questions = require('./questions');

module.exports = {
  products,
  reviews,
  questions,
  cart,
};
