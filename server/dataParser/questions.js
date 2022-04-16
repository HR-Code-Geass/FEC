const heroku = require('../apis/heroku');

module.exports = {
  fetchQuestionsData(productID = 65632, page = null, count = null) {
    const URL = (page && count)
      ? `/qa/questions?product_id=${productID}&page=${page}&count=${count}`
      : `/qa/questions?product_id=${productID}&count=999999`;
    return new Promise((resolve, reject) => {
      heroku.get(URL)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },

  fetchAnswerData(questionID = 573876) {
    return new Promise((resolve, reject) => {
      heroku.get(`/qa/questions/${questionID}/answers`)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },

  addQuestion(data) {
    return new Promise((resolve, reject) => {
      heroku.post('/qa/questions', data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },

  addAnswer(questionID, data) {
    return new Promise((resolve, reject) => {
      heroku.post(`/qa/questions/${questionID}/answers`, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  makeQuestionAsHelpful(questionID) {
    return new Promise((resolve, reject) => {
      heroku.put(`/qa/questions/${questionID}/helpful`, '')
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  reportQuestion(questionID) {
    return new Promise((resolve, reject) => {
      heroku.put(`/qa/questions/${questionID}/report`, '')
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  makeAnswerAsHelpful(answerID) {
    return new Promise((resolve, reject) => {
      heroku.put(`/qa/answers/${answerID}/helpful`, '')
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  reportAnswer(answerID) {
    return new Promise((resolve, reject) => {
      heroku.put(`/qa/answers/${answerID}/report`, '')
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
