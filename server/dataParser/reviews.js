const axios = require('axios');
const Promise = require('bluebird');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';

const config = {
  headers: {
    Authorization: process.env.GIT_TOKEN,
  },
};

module.exports = {
  fetchReviewsData(sort, productID = 65632, page = 1, count = 5) {
    return new Promise((resolve, reject) => {
      if (sort) {
        axios.get(`${url}/reviews?product_id=${productID}&page=${page}&count=${count}&sort=${sort}`, config)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err));
      } else {
        axios.get(`${url}/reviews?product_id=${productID}&page=${page}&count=${count}`, config)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err));
      }
    });
  },

  fetchReviewMeta(productID = '65632') {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/reviews/meta?product_id=${productID}`, config)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },

  addReview(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/reviews`, data, config)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  markReviewAsHelpful(reviewID = 1136190) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/reviews/${reviewID}/helpful`, '', config)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  reportReview(reviewID = '1136190') {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/reviews/${reviewID}/report`, '', config)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
