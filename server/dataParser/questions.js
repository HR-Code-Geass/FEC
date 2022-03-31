const axios = require('axios');
const Promise = require('bluebird');
let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';

var config = {
  headers: {
    Authorization: process.env.GIT_TOKEN
  }
}
module.exports = {
  fetchQuestionsData (productID = '65632') {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/qa/questions?product_id=${productID}`, config)
        .then(res => resolve(res.data))
        .catch(err=> reject(err))
    })
  },

  fetchAnswerData (questionID = '573876') {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/qa/questions/${questionID}/answers`, config)
        .then(res => resolve(res.data))
        .catch(err=> reject(err))
    })
  },

  addQuestion (data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/qa/questions`, data, config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  addAnswer (questionID, data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/qa/questions/${questionID}/answers
      `, data, config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },

  makeQuestionAsHelpful (questionID) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/qa/questions/${questionID}/helpful
    `, config)
      .then(res => resolve(res))
      .catch(err => reject(err))
    })
  },

  reportQuestion (questionID) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/qa/questions/${questionID}/report`, config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  makeAnswerAsHelpful (answerID) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/qa/answers/${answerID}/helpful`, config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },

  reportAnswer (answerID) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/qa/answers/${answerID}/report`, config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}