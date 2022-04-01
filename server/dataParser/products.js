const axios = require('axios');
const Promise = require('bluebird');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';

const config = {
  headers: {
    Authorization: process.env.GIT_TOKEN,
  },
};

module.exports = {
  fetchProductsData(page = 1, count = 5) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products?page=${(page)}&count=${(count)}`, config)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
  fetchProductIDData(productID, styled, related) {
    return new Promise((resolve, reject) => {
      if (related) {
        axios.get(`${url}/products/${productID}/related`, config)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err));
      } else if (styled) {
        axios.get(`${url}/products/${productID}/styles`, config)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err));
      } else if (productID) {
        axios.get(`${url}/products/${productID}`, config)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err));
      }
    });
  },
};
