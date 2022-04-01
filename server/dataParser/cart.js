require('dotenv').config();

const axios = require('axios');
const Promise = require('bluebird');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';
const config = {
  headers: {
    Authorization: process.env.GIT_TOKEN,
  },
};
module.exports = {
  fetchCartData() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/cart`, config)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
  addCart(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/cart`, data, config)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
